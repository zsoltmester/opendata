'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')

class UserController {

	*
	create(request, response) {
		yield response.sendView('signUp');
	}

	*
	store(request, response) {
		const userData = request.only('username', 'password', 'email')

		const rules = {
			username: 'required',
			password: 'required',
			email: 'required'
		}

		const validation = yield Validator.validate(userData, rules)

		if (validation.fails()) {
			yield request
				.withOnly('username', 'password', 'email')
				.andWith({
					errors: validation.messages()
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
						message: "Failed to create user. Maybe the username or the email are not available."
					}]
				})
				.flash()
			response.redirect('back')
		}
	}

	*
	credentials(request, response) {
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
					errors: validation.messages()
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
					}]
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
	check(request, response) {
		const isLoggedIn = yield request.auth.check()
		return isLoggedIn
	}
}

module.exports = UserController
