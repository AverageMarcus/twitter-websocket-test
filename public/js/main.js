$(document).ready(function() {

  var socket = io.connect(window.location.href);
  socket.on('new tweet', function (data) {
    for(var i=0;i<data.length;i++){
      buildTweet(data[i]);
    }
  });
  
  $('#searchTerm').on('keyup', function(event){
    if(event.keyCode==13){
      $('#tweets').html('');
      socket.emit('follow tweets', {searchTerm : $(this).val(), tokens : JSON.parse($('#tokens').text()) });
    }
  });

});

var addedTweets = [];
var buildTweet = function buildTweet(tweet){
  if(addedTweets.indexOf(tweet.id)<0){
    var $img = $('<img/>').addClass('tweetImage').attr('src', tweet.user.profile_image_url),
        $username = $('<div/>').addClass('tweetUsername').text(tweet.user.screen_name),
        $text = $('<div/>').addClass('tweetText').text(tweet.text),
        $tweetHolder = $('<div/>').addClass('tweetHolder');
    
    addedTweets.push(tweet.id);
    $tweetHolder.append($img).append($username).append($text);
    $('#tweets').prepend($tweetHolder);
  }
};
