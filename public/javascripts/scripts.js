//adding filter popup

var $filterButton = $('#filter-button');
var $filterPopup = $('.filter-popup');
var $filterError = $('.filter-error');
var $yearStartInput = $('#yearStart');
var $yearEndInput = $('#yearEnd');
var $filterApplyButton = $('#filter-apply');
var $filterForm = $('#filter-form');

$filterButton.click(function(){
	$filterPopup.css("display", "block");

});


$(function() {
	$yearStartInput.keyup(function() {
		
		if ($yearStartInput.val().length == 4) {
			$yearEndInput.focus();
		}

	});
});

$filterForm.submit(function(){

	if ($yearStartInput.val().length !== 4 || $yearEndInput.val().length !== 4) {
		$filterError.css("display", "block");
		return false;
	} else {

		return true;
	}

});