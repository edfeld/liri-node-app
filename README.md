
# liri-node-app

Use Node with API packages.

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

1. liri.js can accepts one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

2. Concert-this
  When a user calls the liri.js file in node with the parameters, "concert-this" and a band name, the liri bot will produce a list of future concerts with the following data items:
  
    *`Venue name`

    *`venue location`

    *`Date of the event in the format: "MM/DD/YYYY"`

    If the user does not enter a band name, liri will default to the band, U2.

3. Spotify-this-song
  When a user calls the liri.js program in node with the parameters, "Spotify-this-song" and the song name, the liri bot will produce a list of songs that match the search and with the following data items:

     * `Artist(s)`

     * `The song's name`

     * `A preview link of the song from Spotify`

     * `A link to the album on Spotify`

     * `The album that the song is from`

     * If no song is provided then the program will default to "The Sign" by Ace of Base.

4. movie-this
  When a user calls the liri.js program in node with the parameters, "movie-this" and a movie name, the liri bot will produce the following output of data from the Movie:

    * `Title of the movie.`

    * `Year the movie came out.`

    * `IMDB Rating of the movie.`

    * `Rotten Tomatoes Rating of the movie.`

    * `Country where the movie was produced.`

    * `Language of the movie.`

    * `Plot of the movie.`

    * `Actors in the movie.`

    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

5. do-what-it-says
  When a user calls the liri.js program in node with the parameter, "do-what-it-says", the program run the Spotify lookup with the song named, "I Want it That Way".  This branch uses the `fs` node package to read a separate file called random.txt and use the text in that file to run the Spotify lookup.

Link to my demonstration video:

```https://drive.google.com/file/d/14SyWYbQsCtQhlzna7IjofDb9RDtAX1tN/view```