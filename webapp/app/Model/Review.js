'use strict'

const Lucid = use('Lucid')

class Review extends Lucid {

	user() {
		return this.belongsTo('App/Model/User')
	}

	dataset() {
		return this.belongsTo('App/Model/Dataset')
	}
	
}

module.exports = Review
