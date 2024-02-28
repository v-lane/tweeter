/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
    <p>${tweetData.content.text}</p>
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

  // given all tweets data, as array of objects, prepends all tweets as individual tweet elements to main element
  const renderTweet = function(tweetData) {
    for (const tweet of tweetData) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };

  // gets tweet data from '/tweets/' and calls renderTweet function
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: function(res) {
        renderTweet(res);
      }
    });
  };

  loadTweets();

  // on '.new-tweet' form submit, validates submission then POSTs form data to '/tweets', else alerts user of error.
  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    const textLength = $(this)[0][0].value.length;
    const textSerialized = $(this).serialize();

    if (textLength === 0) {
      alert('Tweet must be at least 1 character!');
    }
    if (textLength > 140) {
      alert('Tweet cannot exceed 140 characters!');
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: textSerialized,
      success: function() {
        $('#tweet-text').val('');
      }
    });
  });
});