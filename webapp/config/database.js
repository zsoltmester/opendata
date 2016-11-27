'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {

	/*
	|--------------------------------------------------------------------------
	| Default Connection
	|--------------------------------------------------------------------------
	|
	| Connection defines the default connection settings to be used while
	| interacting with SQL databases.
	|
	*/
	connection: Env.get('DB_CONNECTION', 'sqlite'),

	/*
	|--------------------------------------------------------------------------
	| Sqlite
	|--------------------------------------------------------------------------
	|
	| Sqlite is a flat file database and can be good choice under development
	| environment.
	|
	| npm i --save sqlite3
	|
	*/
	sqlite: {
		client: 'sqlite3',
		connection: {
			filename: Helpers.databasePath('development.sqlite')
		},
		useNullAsDefault: true
	}
}
