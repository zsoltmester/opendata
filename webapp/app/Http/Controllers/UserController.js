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
		} else {
			yield User.create(userData)
			response.redirect('/')
		}
	}

	*
	login(request, response) {
		const username = request.input('username')
		const password = request.input('password')
		var login
		try {
			login = yield request.auth.attempt(username, password)
		} catch (exception) {
			yield response.with({
				error: exception.message
			}).flash()
		}
		if (login) {
			response.send('Logged in successfully')
		} else {
			response.unauthorized('Invalid credentails')
		}
	}

	*
	logout(request, response) {
		yield request.auth.logout()
		response.send('Logged out successfully')
	}

	*
	check(request, response) {
		const isLoggedIn = yield request.auth.check()
		return isLoggedIn
	}
}

module.exports = UserController
