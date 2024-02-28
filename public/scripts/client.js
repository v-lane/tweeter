/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // input value in milliseconds, returns value in days (rounded down to nearest day)
  const msToDay = function(ms) {
    const day = Math.floor(ms / 1000 / 60 / 60 / 24);
    return day;
  };

  // given value in milliseconds, returns number of days ago that time was from now (rounded down to nearest day)
  const daysAgo = function(ms) {
    const today = new Date();
    const timeAgo = today - ms;
    return msToDay(timeAgo);
  };

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
      <time>${daysAgo(tweetData.created_at)} days ago</time>
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

  // given all tweets data, as array of objects, appends all tweets as individual tweet elements to main element
  const renderTweet = function(tweetData) {
    for (const tweet of tweetData) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };

  renderTweet(data);

  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    console.log('button clicked, performing ajax call...');

    // add ajax call here (method post)

  });

});