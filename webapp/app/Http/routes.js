'use strict'

const Route = use('Route')

// user pages
Route.get('/signup', 'UserController.showSignup').as('signup')
Route.post('/signup', 'UserController.signup').as('doSignup')
Route.get('/login', 'UserController.showLogin').as('login')
Route.post('/login', 'UserController.login').as('doLogin')
Route.get('/logout', 'UserController.logout').as('logout').middleware('auth')
Route.get('/profile', 'UserController.showProfile').as('profile').middleware('auth')
Route.post('/profile', 'UserController.modify').as('modifyProfile').middleware('auth')

// admin pages
Route.group('manage', function() {
	Route.get('/users', 'UserController.showUsers').as('users')
	Route.post('/users', 'UserController.delete').as('deleteUsers')
}).prefix('/manage').middleware('auth', 'admin')

// public dataset pages
Route.get('/', 'DatasetController.index').as('main')
Route.get('/dataset/:id/show', 'DatasetController.show').as('show')

// auth dataset pages
Route.group('dataset', function() {
	Route.get('/add', 'DatasetController.showAdd').as('add')
	Route.post('/add', 'DatasetController.add').as('doAdd')
	Route.get('/:id/modify', 'DatasetController.showModify').as('modify').middleware('perm')
	Route.post('/:id/modify', 'DatasetController.modify').as('doModify').middleware('perm')
	Route.get('/:id/delete', 'DatasetController.delete').as('delete').middleware('perm')
	Route.post('/:id/review/add', 'DatasetController.addReview').as('review').middleware('perm')
	Route.get('/:id/review/:review_id/delete', 'DatasetController.deleteReview').as('deleteReview').middleware('perm')
}).prefix('/dataset').middleware('auth')
