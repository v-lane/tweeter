

$(document).ready(function() {
  $("#tweet-text").on('input', function(event) {
    let valueLength = $(this).val().length;
    let charRemaining = 140 - (valueLength)
    $(this).parents('.new-tweet').find('.counter').text(charRemaining)
  })
});
