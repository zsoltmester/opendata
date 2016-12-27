'use strict'

const Validator = use('Validator')
const Hash = use('Hash')

const User = use('App/Model/User')

class UserController {

	*
	showSignup(request, response) {
		yield response.sendView('signUp');
	}

	*
	signup(request, response) {
		const input = request.only('username', 'password', 'email')

		const rules = {
			username: 'required|unique:users',
			password: 'required',
			email: 'required|email|unique:users'
		}

		const validation = yield Validator.validate(input, rules)

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
			yield User.create(input)
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
	login(request, response) {
		const input = request.only('username', 'password')

		const rules = {
			username: 'required',
			password: 'required'
		}

		const validation = yield Validator.validate(input, rules)

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
			yield request.auth.attempt(input.username, input.password)
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
		const input = request.only('password', 'email')

		var infos = []
		var errors = []

		const passwordRules = {
			password: 'required'
		}
		const passwordValidation = yield Validator.validate(input, passwordRules)
		if (!passwordValidation.fails()) {
			request.currentUser.password = yield Hash.make(input.password)
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
		const emailValidation = yield Validator.validate(input, emailRules)
		if (!emailValidation.fails()) {
			request.currentUser.email = input.email
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
		} else if (input.email !== request.currentUser.email) {
			for (var error in emailValidation.messages()) {
				errors.push({
					message: emailValidation.messages()[error].message
				})
			}
		}

		if (request.ajax()) {
			response.send({
				success: true,
				infos,
				errors,
				email: request.currentUser.email
			})
		} else {
			yield request
				.with({
					infos: infos,
					errors: errors
				})
				.flash()

			response.redirect('back')
		}
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
