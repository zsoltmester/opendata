'use strict'

/*
|--------------------------------------------------------------------------
| Model and Database Factory
|--------------------------------------------------------------------------
|
| Factories let you define blueprints for your database models or tables.
| These blueprints can be used with seeds to create fake entries. Also
| factories are helpful when writing tests.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Model/Dataset', (fake) => {
	return {
		user_id: 1,
		summary: fake.sentence(),
		description: fake.paragraph(),
		format: fake.word(),
		link: fake.url(),
		access: fake.paragraph(),
		rate: fake.floating({
			min: 0,
			max: 5
		})
	}
})

Factory.blueprint('App/Model/Review', (fake) => {
	return {
		user_id: 1,
		dataset_id: 1,
		comment: fake.paragraph(),
		rate: fake.integer({
			min: 0,
			max: 5
		})
	}
})
