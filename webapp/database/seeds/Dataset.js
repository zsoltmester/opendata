'use strict'

const Dataset = use('App/Model/Dataset')

class DatasetSeeder {

	*
	run() {
		const initialDatasets = [{
			user_id: 1,
			summary: 'Enron emails',
			description: '"It contains data from about 150 users, mostly senior management of Enron, organized into folders. The corpus contains a total of about 0.5M messages." For more information: https://www.cs.cmu.edu/~./enron/.',
			access: 'Download and untar it.',
			format: 'CSV',
			link: 'https://www.cs.cmu.edu/~./enron/',
			rate: 5
		}, {
			user_id: 1,
			summary: 'UK food hygiene rating data',
			description: '"The data provide the food hygiene rating or inspection result given to a business and reflect the standards of food hygiene found on the date of inspection or visit by the local authority. Businesses include restaurants, pubs, cafés, takeaways, hotels and other places consumers eat, as well as supermarkets and other food shops." For more information: http://ratings.food.gov.uk/open-data/.',
			access: 'You can reach it through an API. There is the documentation for it: http://api.ratings.food.gov.uk/help.',
			format: 'API',
			link: 'http://ratings.food.gov.uk/open-data/',
			rate: 5
		}]

		for (var dataset of initialDatasets) {
			yield Dataset.create(dataset)
		}
	}
}

module.exports = DatasetSeeder
