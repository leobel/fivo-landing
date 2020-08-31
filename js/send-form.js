$(document).ready(function(){
	// Contact form
	$('#contact').click(function(){
		var name = $('#name').val();
		var email = $('#cemail').val();
		var message = $('#message').val();
		$.ajax({
			type: "POST",
			url: "contact.php",
			data: { name: name, email: email, message: message },         
			success: function() {
				$('#name').val('');
				$('#cemail').val('');
				$('#message').val('');
				$('#contact-alert').show();
				setTimeout(function(){
					$('#contact-alert').hide();
				}, 3000);
			}
		});
	});

	//only email contact
	$('#contact-footer').click(function(){
		var email = $('#lead-email-footer').val();
		$.ajax({
			type: "POST",
			url: "contact.php",
			data: { name: 'Lead', email: email, message: 'From footer' },         
			success: function() {
				$('#lead-email-footer').val('');
				$('[data-toggle="popover"]').popover('show');
				setTimeout(function(){
					$('[data-toggle="popover"]').popover('hide');
				}, 3000);
			}
		});
	});
});