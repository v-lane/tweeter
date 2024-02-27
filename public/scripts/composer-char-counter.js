

$(document).ready(function() {

  // on input in id tweet-text, updates counter for tweet-text with remaining characters
  $("#tweet-text").on('input', function() {
    let valueLength = $(this).val().length;
    let charRemaining = 140 - (valueLength)
    $(this).parents('.new-tweet').find('.counter').text(charRemaining)
  })
});
