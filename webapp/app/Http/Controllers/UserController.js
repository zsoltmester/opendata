'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Hash = use('Hash')

class UserController {

	*
	showSignup(request, response) {
		yield response.sendView('sign_up');
	}

	*
	signup(request, response) {
		const userData = request.only('username', 'password', 'email')

		const rules = {
			username: 'required|unique:users',
			password: 'required',
			email: 'required|email|unique:users'
		}

		const validation = yield Validator.validate(userData, rules)

		if (validation.fails()) {
			yield request
				.withOnly('username', 'email')
				.andWith({
					errors: validation.messages()
				})
				.flash()

			response.redirect('back')
			return
		}

		try {
			yield User.create(userData)
			yield request
				.with({
					infos: [{
						message: "Signed up successfully."
					}]
				})
				.flash()
			response.redirect('/')
		} catch (exception) {
			yield request
				.withOnly('username', 'email')
				.andWith({
					errors: [{
						message: "Failed to create user. Maybe the username or the email are not available.",
					}]
				})
				.flash()

			response.redirect('back')
		}
	}

	*
	showLogin(request, response) {
		yield response.sendView('login');
	}

	*
	login(request, response) {
		const userData = request.only('username', 'password')

		const rules = {
			username: 'required',
			password: 'required'
		}

		const validation = yield Validator.validate(userData, rules)

		if (validation.fails()) {
			yield request
				.withOnly('username')
				.andWith({
					errors: validation.messages()
				})
				.flash()

			response.redirect('back')
			return
		}

		try {
			yield request.auth.attempt(userData.username, userData.password)
			yield request
				.with({
					infos: [{
						message: "Logged in successfully."
					}]
				})
				.flash()
			response.redirect('/')
		} catch (exception) {
			yield request
				.withOnly('username')
				.andWith({
					errors: [{
						message: exception.message
					}]
				})
				.flash()

			response.redirect('back')
		}
	}

	*
	logout(request, response) {
		yield request.auth.logout()
		yield request
			.with({
				infos: [{
					message: "Logged out successfully."
				}]
			})
			.flash()
		response.redirect('/')
	}

	*
	showProfile(request, response) {
		yield response.sendView('profile');
	}

	*
	modify(request, response) {
		const userData = request.only('password', 'email')
		userData.email = userData.email.trim()

		var infos = []
		var errors = []

		const passwordRules = {
			password: 'required'
		}
		const passwordValidation = yield Validator.validate(userData, passwordRules)
		if (!passwordValidation.fails()) {
			request.currentUser.password = yield Hash.make(userData.password)
			try {
				yield request.currentUser.save()
				infos.push({
					message: "Your password modified successfully."
				})
			} catch (exception) {
				errors.push({
					message: "Failed to modify your password."
				})
			}
		}

		const emailRules = {
			email: 'required|email|unique:users'
		}
		const emailValidation = yield Validator.validate(userData, emailRules)
		if (!emailValidation.fails()) {
			request.currentUser.email = userData.email
			try {
				yield request.currentUser.save()
				infos.push({
					message: "Your email modified successfully."
				})
			} catch (exception) {
				errors.push({
					message: "Failed to modify your email."
				})
			}
		} else if (userData.email && userData.email.length > 0) {
			for (var error in emailValidation.messages()) {
				errors.push({
					message: emailValidation.messages()[error].message
				})
			}
		}

		yield request
			.with({
				infos: infos,
				errors: errors
			})
			.flash()

		response.redirect('back')
	}

	*
	showUsers(request, response) {
		const users = yield User.all()
		yield response.sendView('users', {
			users: users.toJSON()
		});
	}

	*
	delete(request, response) {
		const users = yield User.all()

		var infos = []
		var errors = []

		for (var user of users) {
			if (!request.input(user.id)) {
				continue
			}
			try {
				yield user.delete()
				infos.push({
					message: user.username + " deleted."
				})
			} catch (exception) {
				errors.push({
					message: "Failed to delete:" + user.username
				})
			}
		}

		yield request
			.with({
				infos: infos,
				errors: errors
			})
			.flash()

		response.redirect('back')
	}

}

module.exports = UserController
