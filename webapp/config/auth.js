'use strict'

const Config = use('Config')

module.exports = {

	/*
	|--------------------------------------------------------------------------
	| Authenticator
	|--------------------------------------------------------------------------
	|
	| Authenticator is a combination of HTTP Authentication scheme and the
	| serializer to be used for retrieving users. Below is the default
	| authenticator to be used for every request.
	|
	| Available Schemes - basic, session, jwt, api
	| Available Serializers - Lucid, Database
	|
	*/
	authenticator: 'session',

	/*
	|--------------------------------------------------------------------------
	| Session Authenticator
	|--------------------------------------------------------------------------
	|
	| Session authenticator will make use of sessions to maintain the login
	| state for a given user.
	|
	*/
	session: {
		serializer: 'Lucid',
		model: 'App/Model/User',
		scheme: 'session',
		uid: 'username',
		password: 'password'
	}
}
