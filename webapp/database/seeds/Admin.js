'use strict'

const Env = use('Env')

const User = use('App/Model/User')

class AdminSeeder {

	*
	run() {
		const admin = {
			username: Env.get('ADMIN_USERNAME')
			password: Env.get('ADMIN_PASSWORD')
			isAdmin: true
		}

		yield User.create(admin)
	}
}

module.exports = AdminSeeder
