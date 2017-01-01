$('#modifyProfileForm').on('submit', function(event) {
	event.preventDefault()

	const url = $(this).attr('action')
	const method = $(this).attr('method')
	const data = $(this).serializeArray()
	const headers = {
		'csrf-token': $('[name="_csrf"]').val()
	}

	$('#inputPassword').val('')

	Promise.resolve(
			$.ajax({
				url,
				method,
				dataType: 'json',
				data,
				headers
			})
		).then(function(data) {
			$('#inputEmail').val(data.email)
			printMessages($('#messages'), data.errors, data.infos)
		})
		.catch(function(reason) {
			const errors = []
			errors.push({
				message: 'Something bad happened!'
			})
			printMessages($('#messages'), errors)
		});
})
