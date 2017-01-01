'use strict'

const Schema = use('Schema')

class ReviewsTableSchema extends Schema {

	up() {
		this.create('reviews', (table) => {
			table.increments()
			table.integer('user_id').unsigned().references('id').inTable('users')
			table.integer('dataset_id').unsigned().references('id').inTable('datasets')
			table.float('rate')
			table.text('comment')
			table.timestamps()
		})
	}

	down() {
		this.drop('reviews')
	}

}

module.exports = ReviewsTableSchema
