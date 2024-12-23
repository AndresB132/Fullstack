const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  youtubeLink: String,
  votes: { type: Number, default: 0 },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
