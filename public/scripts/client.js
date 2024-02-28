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
    })
  }

  loadTweets();


  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    const textSerialized = $(this).serialize();

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