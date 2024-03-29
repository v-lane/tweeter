/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // MARKUP FUNCTIONS

  // given tweet object data, returns tweet element
  const createTweetElement = function(tweetData) {
    const tweet = $(`
    <article class="tweet">
    <header>
      <div class="userInfo">
        <img src=${tweetData.user.avatars}>
        <h2>${tweetData.user.name}</h2>
      </div>
      <h3>${tweetData.user.handle}</h3>
    </header>
    <p>${escape(tweetData.content.text)}</p>
    <footer>
      <time>${timeago.format(tweetData.created_at)}</time>
      <div class="interactions">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`
    );
    return tweet;
  };


  // HELPER FUNCTIONS

  // escape text from user
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // given all tweets data, as array of objects, prepends all tweets as individual tweet elements to main element
  const renderTweets = function(tweetData) {
    for (const tweet of tweetData) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };

  // gets tweet data from '/tweets' and calls renderTweets function
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (res) => {
        renderTweets(res);
      }
    });
  };


  // LISTENING

  // on '.new-tweet' form submit, validates submission then POSTs form data to '/tweets', else alerts user of error.
  $('.new-tweet form').on('submit', function(event) {
    $('.new-tweet .error').hide().text('');
    event.preventDefault();
    const textLength = $(this)[0][0].value.trim().length;
    const textSerialized = $(this).serialize();

    if (textLength === 0) $('.new-tweet .error').slideDown(400).text('Tweet must be at least 1 character, not including spaces.');
    else if (textLength > 140) $('.new-tweet .error').slideDown(400).text('Tweet cannot exceed 140 characters.');
    else $.ajax({
      method: "POST",
      url: "/tweets",
      data: textSerialized,
      success: () => {
        $('.new-tweet .error').hide().text('');
        $('#tweet-text').val('');
        $('.counter').val('140');
        $('.tweets').empty();
        loadTweets();
      }
    });
  });

  // on 'nav button' click, hides the '.new-tweet' section. If section is hidden, shows section and focuses mouse on
  $('nav button').on('click', function() {
    const newTweet = $('.new-tweet');
    if (newTweet.css("display") == "none") {
      newTweet.slideDown();
      $('#tweet-text').focus();
    } else {
      newTweet.slideUp();
    }
  });

  // on scroll away from top of screen, nav tweet button disappears and bottom '.nav-up' button appears.
  // on scroll, when reaches top of screen, nav tweet button appears and bottom '.nav-up' button disappears.
  $(window).on('scroll', function() {
    const scrollPos = $(window).scrollTop();
    const composeTweetButton = $('nav ul');
    const navUpButton = $('.nav-up')
    if (scrollPos <= 0) {
      composeTweetButton.show();
      navUpButton.hide();
    } else {
      composeTweetButton.hide();
      navUpButton.show();
    }
  })

  //on bottom '.nav-up' button click, window scrolls to top, '.new-tweet' section opens (if previously closed), and mouse focuses on text area.
  $('.nav-up').on('click', function() {
    $(window).scrollTop(0)
    $('.new-tweet').slideDown();
    $('#tweet-text').focus();
  })

  // ON PAGE LOAD

  loadTweets();
});