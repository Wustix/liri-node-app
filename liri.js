require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");

var command = process.argv[2];
var query = process.argv[3];


// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var myTweets = function () {

    //let twitter = require("twitter");
    var client = new Twitter(keys.twitter);

    var params = {
        screen_name: 'GiantGreenLion',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            console.log("My 20 Most Recent Tweets");
            console.log("");
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log("( #" + (i + 1) + " )  " + tweets[i].text);
            console.log("Created:  " + tweets[i].created_at);
            console.log("");
        }
    });


}

var spotifyThisSong = function () {

    //let spotify = require("spotify");
    var spotify = new Spotify(keys.spotify);

    if (trackQuery === undefined) {
        trackQuery = "the sign ace of base";
    }

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

if (command === "my-tweets") {
    myTweets();
} else if (command === "spotify-this-song") {
    spotifyThisSong(query);
} else if (command === "movie-this") {
    movieThis(query);
} else if (command === "do-what-it-says") {
    // App functionality from file read / loads fs npm package
    var fs = require("fs");

    fs.readFile("random.txt", "utf-8", function (error, data) {
        var command;
        var query;

        // If there is a comma, then we will split the string from file in order to differentiate between the command and query
        // 	--> if there is no comma, then only the command is considered (my-tweets)
        if (data.indexOf(",") !== -1) {
            var dataArr = data.split(",");
            command = dataArr[0];
            query = dataArr[1];
        } else {
            command = data;
        }

        // After reading the command from the file, decides which app function to run
        if (command === "my-tweets") {
            myTweets();
        } else if (command === "spotify-this-song") {
            spotifyThisSong(query);
        } else if (command === "movie-this") {
            movieThis(query);
        } else { // Use case where the command is not recognized
            console.log("Command from file is not a valid command! Please try again.")
        }
    });
} else if (command === undefined) { // use case where no command is given
    console.log("Please enter a command to run LIRI.")
} else { // use case where command is given but not recognized
    console.log("Command not recognized! Please try again.")
}