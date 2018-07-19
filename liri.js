require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");



// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var myTweets = function () {

    var twitter = require("twitter");
    var client = new Twitter(keys.twitter);

    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            console.log("My 20 Most Recent Tweets");
            console.log("");
        }
    });


}

var spotifyThisSong = function () {

    var spotify = require("spotify");
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Song" + data.tracks.items[0].name);
        console.log("Preview Link" + data.tracks.items[0].preview.url);
        console.log("Album" + data.tracks.items[0].album.name);
    });

}

var movieThis = function () {



}