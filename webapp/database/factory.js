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
		summary: fake.sentence(),
		description: fake.paragraph()
	}
})
