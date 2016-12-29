$('#deleteDatasetButton').on('click', function(event) {
	event.preventDefault()
	co(function*() {
		const confirmed = yield confirm()
		if (confirmed) {
			location.assign($(event.currentTarget).attr('href'))
		}
	}.bind(this))
})
