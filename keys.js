//js
console.log('this is loaded: keys.js');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsInTown = {
    secret: process.env.BANDSINTOWN_SECRET
};

exports.OMDB = {
    secret: process.env.OMDB_SECRET
};