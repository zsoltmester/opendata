'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Hash = use('Hash')

class UserController {

	*
	showSignup(request, response) {
		yield response.sendView('signUp');
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
				.withOnly('username', 'password', 'email')
				.andWith({
					errors: validation.messages(),
					username: userData.username,
					password: userData.password,
					email: userData.email
				})
				.flash()

			response.redirect('back')
			return
		}

		try {
			yield User.create(userData)
			response.redirect('/')
		} catch (exception) {
			yield request
				.with({
					errors: [{
						message: "Failed to create user. Maybe the username or the email are not available.",
					}],
					username: userData.username,
					password: userData.password,
					email: userData.email
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
				.withOnly('username', 'password')
				.andWith({
					errors: validation.messages(),
					username: userData.username,
					password: userData.password
				})
				.flash()

			response.redirect('back')
			return
		}

		try {
			yield request.auth.attempt(userData.username, userData.password)
			response.redirect('/')
		} catch (exception) {
			yield request
				.with({
					errors: [{
						message: exception.message
					}],
					username: userData.username,
					password: userData.password
				})
				.flash()

			response.redirect('back')
		}
	}

	*
	logout(request, response) {
		yield request.auth.logout()
		response.redirect('/')
	}

	*
	showProfile(request, response) {
		yield response.sendView('profile');
	}

	*
	modify(request, response) {
		const userData = request.only('username', 'password', 'email')

		const passwordRules = {
			password: 'required'
		}
		const passwordValidation = yield Validator.validate(userData, passwordRules)
		if (!passwordValidation.fails()) {
			request.currentUser.password = yield Hash.make(userData.password)
			try {
				yield request.currentUser.save()
				yield request
					.with({
						infos: [{
							message: "Your password modified successfully."
						}]
					})
					.flash()
			} catch (exception) {
				yield request
					.with({
						errors: [{
							message: "Failed to modify your password."
						}]
					})
					.flash()
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
				yield request
					.with({
						infos: [{
							message: "Your email modified successfully."
						}]
					})
					.flash()
			} catch (exception) {
				yield request
					.with({
						errors: [{
							message: "Failed to modify your email."
						}]
					})
					.flash()
			}
		}

		response.redirect('back')
	}
}

module.exports = UserController
