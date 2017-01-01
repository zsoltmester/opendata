'use strict'

class Admin {

	*
	handle(request, response, next) {
		if (!request.currentUser.isAdmin) {
			response.unauthorized('Not enough privilages.')
			return
		}

		yield next
	}
}

module.exports = Admin
