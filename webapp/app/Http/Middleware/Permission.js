'use strict'

const Dataset = use('App/Model/Dataset')
const Review = use('App/Model/Review')

class Permission {

	*
	handle(request, response, next) {
		if (request.currentUser.isAdmin) {
			yield next
			return
		}

		if (request.match('/dataset/:id/modify') || request.match('/dataset/:id/delete')) {
			const datasetId = request.param('id')
			const dataset = yield Dataset.find(datasetId)
			if (dataset.user_id !== request.currentUser.id) {
				response.unauthorized('Not enough privilages.')
				return
			}
		}

		if (request.match('/dataset/:id/review/:review_id/delete')) {
			const reviewId = request.param('review_id')
			const review = yield Review.find(reviewId)
			if (review.user_id !== request.currentUser.id) {
				response.unauthorized('Not enough privilages.')
				return
			}
		}

		yield next
	}

}

module.exports = Permission
