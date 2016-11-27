'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'DatasetController.index')

Route.get('/signup', 'UserController.showSignup')
Route.post('/signup', 'UserController.signup')
Route.get('/login', 'UserController.showLogin')
Route.post('/login', 'UserController.login')
Route.get('/logout', 'UserController.logout')
Route.get('/profile', 'UserController.showProfile')
Route.post('/profile', 'UserController.modify')
