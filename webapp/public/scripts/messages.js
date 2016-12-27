function printMessages(messagesElement, errors, infos) {
	messagesElement.empty()

	if (typeof errors !== 'undefined' && errors.length > 0) {
		for (var error in errors) {
			messagesElement.append(`
				<div class="alert alert-dismissible alert-danger">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					${ errors[error].message }
				</div>
			`)
		}
	}

	if (typeof infos !== 'undefined' && infos.length > 0) {
		for (var info in infos) {
			messagesElement.append(`
				<div class="alert alert-dismissible alert-success">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					${ infos[info].message }
				</div>
			`)
		}
	}
}
