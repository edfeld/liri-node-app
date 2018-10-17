// liri.js

// fs is a core Node package for reading and writing files
var fs = require("fs");
var moment = require('moment');

require('dotenv').config();

var request = require('request');

let liriCommand = process.argv[2];
let liriParm1;
if(process.argv.length > 3) {
    // liriParm1 = process.argv[3];
    liriParm1 = process.argv.slice(3).join(' ');
    console.log(process.argv.slice(3));
    console.log("======liriParm1: ", liriParm1);

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
// console.log("keys:  ------ ", keys);

var bandsInTown = keys.bandsInTown;
// console.log("bandsInTown: ", bandsInTown);
// console.log("======keys.OMDB.secrets: ", keys.OMDB.secret);
var myOMDB = keys.OMDB;
// console.log("OMDB Keys secret1: ", myOMDB.secret);

function SpotifyThisSong(searchStr) {

    console.log("============================= spotify-this-song =========================================");
        let itemCount = 0;
        // console.log("76====================keys.spotify: ", keys.spotify);
        var spotify = new Spotify(keys.spotify);
        
        // console.log("79 spotify: ", spotify );
        // console.log("80 spotify id: ", spotify.credentials.id);
        // console.log("spotify secret: ", spotify.credentials.secret);
        console.log("liriParm1: ", searchStr);
        if((searchStr !== null) && (searchStr !== undefined)) {
            // Nothing
        } else {
            searchStr = 'The Sign';
        }
        searchStr = searchStr.trim(); 
        spotify
            .search({ type: 'track', query: searchStr })
            .then(function(response) {
                // console.log("response: >>>>>>>>>>", response);
                // console.log("response.tracks.items[0]=====", response.tracks.items[0]);
                // console.log("90 Spotify Artist's Name: ", response.tracks.items[0].artists.name);
                // let theTrack = JSON.parse(JSON.stringify(response.tracks.items[0]));
                // console.log("theTrack: ", theTrack);
                
                // console.log("\nArtist Name: ", theTrack.artists[0].name);
                // console.log("Song Title: ", theTrack.name);
                // console.log("Song preview link: ", theTrack.preview_url);
                // console.log("Spotify album Link: ", theTrack.external_urls.spotify);
                // console.log("Album name: ", theTrack.album.name);
                
                let arrTrack = JSON.parse(JSON.stringify(response.tracks.items));
                console.log("theTrack.length: ", arrTrack.length);
                console.log("\n=======================================================================\n");
                console.log("   Song Name: ", searchStr);
                arrTrack.forEach(element => {
                    // console.log("\n Track element: ", element);
                    console.log("\nArtist Name: ", element.artists[0].name);
                    console.log("Song Title: ", element.name);
                    console.log("Song preview link: ", element.preview_url);
                    console.log("Spotify album Link: ", element.external_urls.spotify);
                    console.log("Album name: ", element.album.name);
                    console.log("\n---------------------------------------")
                });
            })
            .catch(function(err) {
                console.log(err);
            });
        
            // * Artist(s)
            // * The song's name
            // * A preview link of the song from Spotify
            // * The album that the song is from
   
}

function concertThis(searchStr) {
    console.log("============================= concert-this ========================================="); 
    if ((searchStr == null) || (searchStr == undefined)) {
        searchStr = 'U2';
    } 
    
    let liriArtistURL = "https://rest.bandsintown.com/artists/";
    liriArtistURL += searchStr;
    liriArtistURL += '/events?app_id='
    liriArtistURL += bandsInTown.secret;
    // console.log("==========++++++++++ liriArtistURL: ", liriArtistURL);
    request(liriArtistURL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body: \n', body); // Print the output from the BandsInTown API.
        // console.log("body", body);
        if (body === "")
            console("empty Body");
        
        let bandBody = JSON.parse(body);
        // let bandBody = JSON.parse(JSON.stringify(body));
        // console.log("concert body: \n", bandBody);
        // console.log("Venue name", bandBody[0].venue.name);
        // console.log("Location: ", bandBody[0].venue.city + "' " + bandBody[0].venue.country);
        // console.log("typeof bandBody: ", typeof bandBody);
        console.log("\n===================== Concert-This =========================================")
        console.log("\n Band Name: ", searchStr);
        console.log("item count: ", bandBody.length);
        bandBody.forEach(element => {
            //  * Name of the venue
            console.log("Venue name: ", element.venue.name);
            //  * Venue location
            console.log("Location: ", element.venue.city + ", " + element.venue.country);
            //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
            console.log("Date: ", moment(element.datetime).format("MM/DD/YYYY") + "\n");
        });
        
    });
}

function movieThis(searchStr) {
    console.log("========================  Movie-This  ============================");
            
    let omdbURL = "http://www.omdbapi.com/?t=";
    // let omdbURL = "http://www.omdbapi.com/?type=movie&s=";
    console.log("searchStr: ", searchStr)
    if((searchStr !== null) && (searchStr !== undefined)) {
        omdbURL += searchStr;
    } else {
        omdbURL += 'Mr. Nobody';
    }
    omdbURL += '&apikey=';
    omdbURL += myOMDB.secret;
    // omdbURL += "&";
    console.log("==========++++++++++ OMDBMovieURL: ", omdbURL);
    request(omdbURL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        
        // console.log("myBody:  ===== : \n", body);
        // console.log(JSON.parse(body));
        let myMovie = JSON.parse(body);
            console.log("==================== Movie-This ============================\n")
            console.log("Movie Title: ", myMovie.Title);
            console.log("Year of release: ", myMovie.Year);
            console.log("IMDB Rating: ", myMovie.imdbRating);
            // console.log("IMDB Rating 2: ", myMovie.Ratings);
            // console.log("keys: ", Object.keys(myMovie.Ratings));
            // console.log("entries: ", Object.entries(myMovie.Ratings));
            // myMovie.Ratings.forEach(movie => {
            //     if (movie.Source === "Rotten Tomatoes") {
            //         console.log("Rotten Tomatoes Rating", movie.Value);
            //     }
            // });
            let foundSource = false;
            myMovie.Ratings.forEach(movie => {
                if (movie.source === "Rotten Tomatoes") {
                    foundSource = true;
                    console.log("Rotten Tomatoes Rating", myMovie.Ratings.Value);
                }
            });
            if (!foundSource) {
                console.log("Rotten Tomatoes Rating:  N/A");
            }
            // console.log("Rotten Tomatoes Rating", myMovie.Ratings.find(source => source.Source === "Rotten Tomatoes").Value);
            console.log("Country of origin: ", myMovie.Country);
            console.log("Language: ", myMovie.Language);
            console.log("Movie plot: ", myMovie.Plot);
            console.log("Actors: ", myMovie.Actors + "\n");
            // * Title of the movie.
            // * Year the movie came out.
            // * IMDB Rating of the movie.
            // * Rotten Tomatoes Rating of the movie.
            // * Country where the movie was produced.
            // * Language of the movie.
            // * Plot of the movie.
            // * Actors in the movie.
        
        // let OMDBBody = JSON.stringify(body, null, 2);
        // console.log("Movie-This body: ", OMDBBody);
    });
}

console.log("47 liricommand: ", liriCommand);
if (!(liriCommand == null)) {
    switch (liriCommand) {
        // =======================================================
        //          concert-this
        // =======================================================
        case 'concert-this':
            concertThis(liriParm1);

            break;
        // =======================================================
        //          Spotify-This-Song
        // =======================================================
        case 'spotify-this-song':
            SpotifyThisSong(liriParm1);

            break;
        // =======================================================
        //          movie-this
        // =======================================================
        case 'movie-this':
            movieThis(liriParm1);
    
        
            break;
        case 'do-what-it-says':
        console.log("========================  do-what-it-says  ============================")
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
                var arrFile = data.split('\n')
                console.log("arrFile: ", arrFile);
                // Then split it by commas (to make it more readable)
                arrFile.forEach(element => {
                    
                    const dataArr = element.split(",");
                    // We will then re-display the content as an array for later use.
                    console.log("dataArr from Random.txt: ", dataArr);
                    let parm = dataArr[1];
                    // console.log("dataArr[1]: =====", dataArr[1]);
                    if ((dataArr[0] !== null) && (dataArr[1] !== null)) {
                        switch (dataArr[0]) {
                            // =======================================================
                            //          concert-this
                            // =======================================================
                            case 'concert-this':
                                // console.log("dataArray ", dataArr);
                                // console.log("dataArr[1] ",dataArr[1]);
                                concertThis(dataArr[1]);``
                    
                                break;
                            // =======================================================
                            //          Spotify-This-Song
                            // =======================================================
                            case 'spotify-this-song':
                                SpotifyThisSong(dataArr[1]);
                    
                                break;
                            // =======================================================
                            //          movie-this
                            // =======================================================
                            case 'movie-this':
                                movieThis(dataArr[1]);

                                break;
                            default:
                                break;
                        }
                    }

                });
            
                
                // ************************************************************************ //
                // Spotiy again                                                             //
                // ************************************************************************ //
                // SpotifyThisSong(dataArr[1]);
                // var spotify = new Spotify(keys.spotify);
                // spotify.search({ type: 'track', query: dataArr[1] })
                //     .then(function(response) {
                //         // console.log("response: >>>>>>>>>>", response);
                //         console.log("response.tracks.items[0]=====", response.tracks.items[0]);
                //         // let theTrack = JSON.stringify(response.tracks.items[0]);
                //         let arrTrack = JSON.parse(JSON.stringify(response.tracks.items));
                //         console.log("\n=======================================================================")
                //         arrTrack.forEach(element => {
                //             // console.log("\n Track element: ", element);
                //             console.log("\nArtist Name: ", element.artists[0].name);
                //             console.log("Song Title: ", element.name);
                //             console.log("Song preview link: ", element.preview_url);
                //             console.log("Spotify album Link: ", element.external_urls.spotify);
                //             console.log("Album name: ", element.album.name);
                //             console.log("\n---------------------------------------")
                //         });
                //     })
                //     .catch(function(err) {
                //         console.log("spotify err: ======++++++++: ", err);
                //     });

            });


            break;
    
        default:
            console.log(" You hit the default. Try Again");
            break;
        }
    }