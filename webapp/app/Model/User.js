'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

	static boot() {
		super.boot()
		this.addHook('beforeCreate', 'User.encryptPassword')
	}

	apiTokens() {
		return this.hasMany('App/Model/Token')
	}

	datasets() {
		return this.hasMany('App/Model/Dataset')
	}

	reviews() {
		return this.hasMany('App/Model/Review')
	}

}

module.exports = User
