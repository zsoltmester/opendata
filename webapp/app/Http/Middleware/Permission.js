'use strict'

const Dataset = use('App/Model/Dataset')
const Review = use('App/Model/Review')

class Permission {

	*
	handle(request, response, next) {
		if (request.currentUser.isAdmin) {
			yield next
		}

		if (request.match('/users')) {
			response.unauthorized('Not enough privilages.')
		}

		if (request.match('/dataset/:id/modify') || request.match('/dataset/:id/delete')) {
			const datasetId = request.param('id')
			const dataset = yield Dataset.find(datasetId)
			if (dataset.user_id !== request.currentUser.id) {
				response.unauthorized('Not enough privilages.')
			}
		}

		if (request.match('/dataset/:id/review/:review/delete')) {
			const reviewId = request.param('review')
			const review = yield Review.find(reviewId)
			if (review.user_id !== request.currentUser.id) {
				response.unauthorized('Not enough privilages.')
			}
		}

		yield next
	}

}

module.exports = Permission
