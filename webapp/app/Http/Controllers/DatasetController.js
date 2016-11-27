'use strict'

const Dataset = use('App/Model/Dataset')

class DatasetController {

	*
	index(request, response) {
		const datasets = yield Dataset.all()
    	yield response.sendView('main', { datasets: datasets.toJSON() })
	}
}

module.exports = DatasetController
