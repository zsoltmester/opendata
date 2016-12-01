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
		yield response.sendView('create')
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
			datasetData.user_id = request.currentUser.id
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
		const modifiedDataset = request.only('summary', 'description', 'format', 'link', 'access')

		var infos = []
		var errors = []

		yield doModification('summary', dataset, modifiedDataset, infos, errors)
		yield doModification('description', dataset, modifiedDataset, infos, errors)
		yield doModification('format', dataset, modifiedDataset, infos, errors)
		yield doModification('link', dataset, modifiedDataset, infos, errors)
		yield doModification('access', dataset, modifiedDataset, infos, errors)

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
