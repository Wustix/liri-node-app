require("dotenv").config();
var fs = require("fs");

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

    let spotify = require("spotify");
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


    let request = require("request");
    let title = process.argv[2];
    let queryUrl = `http://www.omdbapi.com/?t=${title}&y=&plot=short&apikey=trilogy`;

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(`Title: ${JSON.parse(body).Title}`);
            console.log(`Release Year: ${JSON.parse(body).Year}`);
            console.log(`Rating: ${JSON.parse(body).Rated}`);
            console.log(`Plot: ${JSON.parse(body).Plot}`);
            console.log(`Rotten Tomatoes: ${JSON.parse(body).Ratings[1].Value}`);
        }

        else console.log(error);

    });

}