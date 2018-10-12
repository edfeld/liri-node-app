// Liri.js

// fs is a core Node package for reading and writing files
var fs = require("fs");

var request = require('request');

let liriCommand = process.argv[2];
let liriParm1 = process.argv[3];

// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log("dataArr from Random.txt: ", dataArr);

});

var Spotify = require('node-spotify-api');

require("dotenv").config();

var keys = require("./keys.js");
console.log("====================keys: ", keys);
var spotify = new Spotify(keys.spotify);
console.log(" spotify: ", spotify );
console.log("spotify id: ", spotify.credentials.id);
console.log("spotify secret: ", spotify.credentials.secret);
var bandsInTown = keys.bandsInTown;
// console.log("bandsInTown: ", bandsInTown);

console.log("liricommand: ", liriCommand);
if (!(liriCommand == null)) {
    switch (liriCommand) {
        case 'concert-this':
            console.log("concert-this"); 
            if (liriParm1 == null) {
                request('https://rest.bandsintown.com/artists/u2/events?app_id=' + bandsInTown.secret, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    // console.log('body:', body); // Print the output from the BandsInTown API.
                    let bandBody = JSON.parse(body);
                    console.log(bandBody);
                });
            } else {
                let liriArtistURL = "https://rest.bandsintown.com/artists/";
                liriArtistURL += liriParm1;
                liriArtistURL += '/events?app_id='
                liriArtistURL += bandsInTown.secret;
                console.log("==========++++++++++ liriArtistURL: ", liriArtistURL);
                request(liriArtistURL, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    // console.log('body:', body); // Print the output from the BandsInTown API.
                    let bandBody = JSON.parse(body);
                    console.log(bandBody[0]);
                });
            }
            break;
        case 'spotify-this-song':

            spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log("spotify data =====+++++++++=========", data); 
          });
        
            break;
        case 'movie-this':
        
            break;
        case 'concert-this':
        
            break;
        case 'do-what-it-says':
        
            break;
    
        default:
            break;
    }
}