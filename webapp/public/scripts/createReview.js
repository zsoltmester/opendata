$('#createReviewForm').on('submit', function(event) {
	event.preventDefault()

	const url = $(this).attr('action')
	const method = $(this).attr('method')
	const data = $(this).serializeArray()
	const headers = {
		'csrf-token': $('[name="_csrf"]').val()
	}

	Promise.resolve(
			$.ajax({
				url,
				method,
				dataType: 'json',
				data,
				headers
			})
		).then(function(data) {
			if (data.oldReviewId) {
				const review = $('#review' + data.oldReviewId)
				review.find('#reviewRate').html(data.newReview.rate)
				review.find('#reviewComment').html(data.newReview.comment)
				review.find('#reviewTimestamp').html(data.newReview.updated_at)
			} else {
				$('#reviews').append(`
						<div id="review${ data.newReview.id }" class="panel panel-default">
							<div class="panel-body">
								<span class="badge">
									<div id="reviewRate">
										${ data.newReview.rate }
									</div>
								</span>
								<div id="reviewComment">
									${ data.newReview.comment }
								</div>
							</div>
							<div class="panel-footer">
								<div id="reviewTimestamp">
									${ data.newReview.updated_at }
								</div>
								<div class="pull-right">
									<a id="deleteReviewButton" href="/dataset/${ data.newReview.dataset_id }/review/${ data.newReview.id }/delete" class="btn btn-danger btn-xs">Delete</a>
								</div>
								<div class="clearfix"></div>
							</div>
						</div>
					`)
				$('#deleteReviewButton').on('click', onDeleteReviewClicked)
			}
			printMessages($('#messages'), data.errors, data.infos)
		})
		.catch(function(reason) {
			const errors = []
			errors.push({
				message: 'Something bad happened!'
			})
			printMessages($('#messages'), errors)
		})
		.then(function(data) {
			$('#review').modal('hide');
		});

})
