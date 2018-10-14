// liri.js

// fs is a core Node package for reading and writing files
var fs = require("fs");
var moment = require('moment');

require('dotenv').config();

var request = require('request');

let liriCommand = process.argv[2];
let liriParm1;
if(process.argv.length > 3) {
    liriParm1 = process.argv[3];
}
var dataArr;
    // This block of code will read from the "random.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    // console.log("FS read file start: ");
    // fs.readFile("random.txt", "utf8", function(error, data) {

    //     // If the code experiences any errors it will log the error to the console.
    //     if (error) {
    //     return console.log("fs.readFile error", error);
    //     }
    
    //     // We will then print the contents of data
    //     console.log("fs.readFile data: ", data);
    
    //     // Then split it by commas (to make it more readable)
    //     dataArr = data.split(",");
    
    //     // We will then re-display the content as an array for later use.
    //     console.log("dataArr from Random.txt: ", dataArr);
    
    // });

var Spotify = require('node-spotify-api');

require("dotenv").config();

var keys = require("./keys.js");
console.log("keys:  ------ ", keys);

var bandsInTown = keys.bandsInTown;
console.log("bandsInTown: ", bandsInTown);
console.log("======keys.OMDB.secrets: ", keys.OMDB.secret);
var myOMDB = keys.OMDB;
console.log("OMDB Keys secret1: ", myOMDB.secret);

console.log("47 liricommand: ", liriCommand);
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
                    console.log("\n Band Name: U2");
                    bandBody.forEach(element => {
                        console.log("Venue name: ", element.venue.name);
                        console.log("Location: ", element.venue.city + ", " + element.venue.country);
                        console.log("Date: ", moment(element.datetime).format("MM/DD/YYYY") + "\n");
                    });
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
                    // console.log('body: \n', body); // Print the output from the BandsInTown API.
                    let bandBody = JSON.parse(body);
                    // let bandBody = JSON.parse(JSON.stringify(body));
                    console.log("concert body: \n", bandBody);
                    // console.log("Venue name", bandBody[0].venue.name);
                    // console.log("Location: ", bandBody[0].venue.city + "' " + bandBody[0].venue.country);
                    // console.log("typeof bandBody: ", typeof bandBody);

                    console.log("\n Band Name: ", liriParm1);
                    bandBody.forEach(element => {
                        console.log("Venue name: ", element.venue.name);
                        console.log("Location: ", element.venue.city + ", " + element.venue.country);
                        console.log("Date: ", moment(element.datetime).format("MM/DD/YYYY") + "\n");
                    });
                    
                });
                
            }

        //  * Name of the venue
        //  * Venue location
        //  * Date of the Event (use moment to format this as "MM/DD/YYYY")


            break;
        case 'spotify-this-song':
            console.log("76====================keys.spotity: ", keys.spotify);
            var spotify = new Spotify(keys.spotify);
            
            console.log("79 spotify: ", spotify );
            console.log("80 spotify id: ", spotify.credentials.id);
            console.log("spotify secret: ", spotify.credentials.secret);
            console.log("liriParm1: ", liriParm1);
            if((liriParm1 !== null) && (liriParm1 !== undefined)) {
                liriParm1 = liriParm1.trim(); 
                spotify
                    .search({ type: 'track', query: liriParm1 })
                    .then(function(response) {
                        // console.log("response: >>>>>>>>>>", response);
                        // console.log("response.tracks.items[0]=====", response.tracks.items[0]);
                        // console.log("90 Spotify Artist's Name: ", response.tracks.items[0].artists.name);
                        let theTrack = JSON.parse(JSON.stringify(response.tracks.items[0]));
                        console.log("theTrack: ", theTrack);
                        console.log("album name: \n", theTrack.album.name);
                        console.log("artist Name: \n", theTrack.artists[0].name);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                
                
                
            } else {
                spotify
                    .search({ type: 'track', query: 'The Sign' })
                    .then(function(response) {
                        // console.log("response: >>>>>>>>>>", response);
                        console.log("response.tracks.items[0]=====", response.tracks.items[0]);
                        let theTrack = JSON.parse(JSON.stringify(response.tracks.items[0]));
                        console.log("theTrack: ", theTrack);
                        console.log("album name: \n", theTrack.album.name);
                        console.log("artist Name: \n", theTrack.artists[0].name);
                    })
                    .catch(function(err) {
                        console.log(err);
                });


            }
        
            break;
        case 'movie-this':
            let omdbURL = "http://www.omdbapi.com/?t=";
            omdbURL += liriParm1;
            omdbURL += '&apikey=';
            omdbURL += myOMDB.secret;
            // omdbURL += "&";
            console.log("==========++++++++++ OMDBMovieURL: ", omdbURL);
            request(omdbURL, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // console.log('body:', body); // Print the output from the BandsInTown API.
                console.log("myBody:  ===== : ", body);
                console.log(JSON.parse(body));
                // let OMDBBody = JSON.stringify(body, null, 2);
                // console.log("Movie-This body: ", OMDBBody);
            });
    
        
            break;
        case 'do-what-it-says':
            console.log("144 Do What it says - start");
            // // This block of code will read from the "random.txt" file.
            // // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
            // // The code will store the contents of the reading inside the variable "data"
            console.log("FS read file start: ");
            fs.readFile("random.txt", "utf8", function(error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                return console.log("fs.readFile error", error);
                }
            
                // We will then print the contents of data
                console.log("fs.readFile data: ", data);
            
                // Then split it by commas (to make it more readable)
                var dataArr = data.split(",");
            
                // We will then re-display the content as an array for later use.
                console.log("dataArr from Random.txt: ", dataArr);
            
                console.log("dataArr[1]: =====", dataArr[1]);
                
                var spotify = new Spotify(keys.spotify);
                spotify.search({ type: 'track', query: dataArr[1] })
                    .then(function(response) {
                        // console.log("response: >>>>>>>>>>", response);
                        console.log("response.tracks.items[0]=====", response.tracks.items[0]);
                        // let theTrack = JSON.stringify(response.tracks.items[0]);
                        let theTrack = JSON.parse(JSON.stringify(response.tracks.items[0]));
                        console.log("theTrack: ", theTrack);
                        console.log("album name: \n", theTrack.album.name);
                        console.log("artist Name: \n", theTrack.artists[0].name);
                    })
                    .catch(function(err) {
                        console.log("spotify err: ======++++++++: ", err);
                    });

                
                
            });
            // var spotify = new Spotify(keys.spotify);
            // spotify.search({ type: 'track', query: "2112" })
            //     .then(function(response) {
            //         // console.log("response: >>>>>>>>>>", response);
            //         console.log("response.tracks.items[0]=====", response.tracks.items[0]);
            //     })
            //     .catch(function(err) {
            //         console.log("spotify err: ======++++++++: ", err);
            //     });


            break;
    
        default:
            console.log(" You hit the default");
            break;
    }
}