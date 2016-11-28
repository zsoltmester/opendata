'use strict'

const Dataset = use('App/Model/Dataset')

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
		// TODO
	}
}

module.exports = DatasetController
