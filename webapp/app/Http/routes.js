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

Route.get('/signup', 'UserController.showSignup')
Route.post('/signup', 'UserController.signup')
Route.get('/login', 'UserController.showLogin')
Route.post('/login', 'UserController.login')
Route.get('/logout', 'UserController.logout').middleware('auth')
Route.get('/profile', 'UserController.showProfile').middleware('auth')
Route.post('/profile', 'UserController.modify').middleware('auth')
Route.get('/users', 'UserController.showUsers').middleware('auth', 'perm')
Route.post('/users', 'UserController.delete').middleware('auth', 'perm')

Route.get('/', 'DatasetController.index')
Route.get('/dataset/add', 'DatasetController.showCreate').middleware('auth')
Route.post('/dataset/add', 'DatasetController.create').middleware('auth')
Route.get('/dataset/:id', 'DatasetController.show')
Route.get('/dataset/:id/modify', 'DatasetController.showModify').middleware('auth', 'perm')
Route.post('/dataset/:id/modify', 'DatasetController.modify').middleware('auth', 'perm')
Route.get('/dataset/:id/delete', 'DatasetController.delete').middleware('auth', 'perm')
Route.post('/dataset/:id/review/add', 'DatasetController.addReview').middleware('auth')
Route.get('/dataset/:id/review/:review/delete', 'DatasetController.deleteReview').middleware('auth', 'perm')
