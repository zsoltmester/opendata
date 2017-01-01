class ConfirmModal {

	constructor() {
		this._modal = $('#confirm')

		this._positive = this._modal.find('.modal-positive')
		this._negative = this._modal.find('.modal-negative')

		this._promise = new Promise(function(resolve, reject) {
			this._resolve = resolve
			this._reject = reject
		}.bind(this))

		this._positive.on('click', e => this.onPositive())
		this._negative.on('click', e => this.onNegative())
	}

	confirm() {
		this._modal.modal('show')
		return this._promise
	}

	onPositive() {
		this._modal.modal('hide')
		this._resolve(true)
	}

	onNegative() {
		this._modal.modal('hide')
		this._resolve(false)
	}
}

function confirm() {
	const confirmModal = new ConfirmModal()
	return confirmModal.confirm()
}
