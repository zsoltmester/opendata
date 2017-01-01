'use strict'

const Lucid = use('Lucid')

class Dataset extends Lucid {

	user() {
		return this.belongsTo('App/Model/User')
	}

	reviews() {
		return this.hasMany('App/Model/Review')
	}

}

module.exports = Dataset
