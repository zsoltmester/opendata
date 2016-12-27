$('#deleteReviewButton').on('click', function(event) {
	event.preventDefault()

	const url = $(this).attr('href')
	const headers = {
		'csrf-token': $('[name="_csrf"]').val()
	}

	Promise.resolve(
			$.ajax({
				url,
				method: 'GET',
				dataType: 'json',
				headers
			})
		).then(function(data) {
			const reviewId = url.split('/')[4]
			$('#review' + reviewId).remove()
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
