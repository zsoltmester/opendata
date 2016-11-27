'use strict'

const Schema = use('Schema')

class DatasetsTableSchema extends Schema {

	up() {
		this.create('datasets', (table) => {
			table.increments()
			table.string('summary')
			table.text('description')
			table.string('format')
			table.string('link')
			table.text('access')
			table.float('rate')
			table.timestamps()
		})
	}

	down() {
		this.drop('datasets')
	}

}

module.exports = DatasetsTableSchema
