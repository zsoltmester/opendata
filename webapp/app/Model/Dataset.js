'use strict'

const Lucid = use('Lucid')

class Dataset extends Lucid {

	user() {
		return this.belongsTo('App/Model/User')
	}

}

module.exports = Dataset
