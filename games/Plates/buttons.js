$('#make-half').on('click', function () {
let count = 0;

	for(i = 0; i <= losers.length - 1; i++) {
		if(losers[i] == 1) {
			$('.bt-half-before').addClass('bt-half-after')
			count++;

			if(count == losers.length - 1)
				return
	}

	}
	//$('#make-half').detach();
});