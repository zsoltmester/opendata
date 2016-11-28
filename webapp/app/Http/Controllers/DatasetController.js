'use strict'

const Dataset = use('App/Model/Dataset')
const Validator = use('Validator')

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
		yield response.sendView('details', {
			dataset: dataset.toJSON()
		})
	}

	*
	showCreate(request, response) {
		yield response.sendView('create');
	}

	*
	create(request, response) {
		const datasetData = request.only('summary', 'description', 'format', 'link', 'access')

		const rules = {
			summary: 'required|unique:datasets',
			description: 'required',
			format: 'required',
			link: 'required',
			access: 'required'
		}

		const validation = yield Validator.validate(datasetData, rules)

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
			yield Dataset.create(datasetData)
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
}

module.exports = DatasetController
