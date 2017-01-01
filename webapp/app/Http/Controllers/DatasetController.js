'use strict'

const Validator = use('Validator')

const Dataset = use('App/Model/Dataset')
const Review = use('App/Model/Review')

class DatasetController {

	*
	index(request, response) {
		const datasets = yield Dataset.all()
		yield response.sendView('main', {
			datasets: datasets.toJSON()
		})
	}

	*
	show(request, response) {
		const dataset = yield Dataset.find(request.param('id'))

		var data = {}
		data.dataset = dataset.toJSON()

		var reviews = yield Review.query().where('dataset_id', dataset.id).fetch()
		if (reviews && reviews.toJSON().length > 0) {
			data.reviews = reviews.toJSON()
		}

		yield response.sendView('details', data)
	}

	*
	showAdd(request, response) {
		yield response.sendView('add')
	}

	*
	add(request, response) {
		const input = request.only('summary', 'description', 'format', 'link', 'access')

		const rules = {
			summary: 'required|unique:datasets',
			description: 'required',
			format: 'required',
			link: 'required',
			access: 'required'
		}

		const validation = yield Validator.validate(input, rules)

		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({
					errors: validation.messages()
				})
				.flash()
			response.redirect('back')
			return
		}

		try {
			input.user_id = request.currentUser.id
			yield Dataset.create(input)
			yield request
				.with({
					infos: [{
						message: "Dataset added successfully."
					}]
				})
				.flash()
			response.redirect('/')
		} catch (exception) {
			yield request
				.withAll()
				.andWith({
					errors: [{
						message: "Failed to add the dataset.",
					}]
				})
				.flash()
			response.redirect('back')
		}
	}

	*
	showModify(request, response) {
		const dataset = yield Dataset.find(request.param('id'))
		yield response.sendView('modify', {
			dataset: dataset.toJSON()
		})
	}

	*
	modify(request, response) {
		const dataset = yield Dataset.find(request.param('id'))
		const input = request.only('summary', 'description', 'format', 'link', 'access')

		var infos = []
		var errors = []

		yield doModification('summary', dataset, input, infos, errors)
		yield doModification('description', dataset, input, infos, errors)
		yield doModification('format', dataset, input, infos, errors)
		yield doModification('link', dataset, input, infos, errors)
		yield doModification('access', dataset, input, infos, errors)

		yield request
			.with({
				infos: infos,
				errors: errors
			})
			.flash()

		response.redirect('back')
	}

	*
	delete(request, response) {
		const dataset = yield Dataset.find(request.param('id'))

		try {
			yield dataset.delete()
			yield request
				.with({
					infos: [{
						message: "Dataset deleted successfully."
					}]
				})
				.flash()
			response.redirect('/')
		} catch (exception) {
			yield request
				.with({
					errors: [{
						message: "Failed to delete the dataset.",
					}]
				})
				.flash()
			response.redirect('back')
		}
	}

	*
	addReview(request, response) {
		const input = request.only('rate', 'comment')

		var infos = []
		var errors = []

		const rules = {
			rate: 'required'
		}

		const validation = yield Validator.validate(input, rules)

		var success
		var oldReviewId
		var newReview

		if (validation.fails()) {
			errors = validation.messages()
			success = false
		} else {
			var oldReview
			try {
				oldReview = yield Review.query().where('dataset_id', request.param('id')).where('user_id', request.currentUser.id).first()

				if (oldReview) {
					oldReview.rate = input.rate
					oldReview.comment = input.comment
					yield oldReview.save()
					oldReviewId = oldReview.id
					newReview = oldReview
				} else {
					input.user_id = request.currentUser.id
					input.dataset_id = request.param('id')
					newReview = yield Review.create(input)
				}

				infos.push({
					message: "Review " + (oldReview ? "modified" : "added") + " successfully."
				})
				success = true
			} catch (exception) {
				errors.push({
					message: "Failed to " + (oldReview ? "modify" : "add") + " the review."
				})
				success = false
			}
		}

		if (request.ajax()) {
			response.send({
				success,
				infos,
				errors,
				oldReviewId,
				newReview
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
	deleteReview(request, response) {
		const review = yield Review.find(request.param('review_id'))

		var success
		var infos = []
		var errors = []

		try {
			yield review.delete()
			infos.push({
				message: "Review deleted successfully."
			})
			success = true
		} catch (exception) {
			errors.push({
				message: "Failed to delete the review."
			})
			success = false
		}

		if (request.ajax()) {
			response.send({
				success,
				infos,
				errors
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
}

function* doModification(property, current, modified, infos, errors) {
	var rules = {}
	rules[property] = 'required'
	const validation = yield Validator.validate(modified, rules)
	if (validation.fails() || current[property] == modified[property]) {
		return
	}

	const oldValue = current[property]
	current[property] = modified[property]
	try {
		yield current.save()
		infos.push({
			message: property + " modified successfully."
		})
	} catch (exception) {
		errors.push({
			message: "Failed to modify " + property + ". Maybe the " + property + " already exists."
		})
	}
}

module.exports = DatasetController
