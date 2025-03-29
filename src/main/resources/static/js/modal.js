$(document).ready(function() {
	$('.close, .btn-close').click(function() {
		$('#overlay, #modal').hide();	
	});
	
	$('#overlay').click(function() {
		$('#overlay, #modal').hide();	
	});
});

function showModal() {
	$('#overlay, #modal').show();
}