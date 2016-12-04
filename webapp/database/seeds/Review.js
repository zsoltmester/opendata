'use strict'

const Review = use('App/Model/Review')

class ReviewSeeder {

	*
	run() {
		const initialReviews = [{
			user_id: 1,
			dataset_id: 1,
			rate: 5,
			comment: 'Classic and still the greatest one for text analysis!'
		}, {
			user_id: 1,
			dataset_id: 2,
			rate: 5,
			comment: 'There is no bigger public pub database, like this.'
		}]

		for (var review of initialReviews) {
			yield Review.create(review)
		}
	}
}

module.exports = ReviewSeeder
