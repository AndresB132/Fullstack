const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

router.get('/random', async (req, res) => {
    const count = await Song.countDocuments();
    const random = Math.floor(Math.random() * count);
    const song = await Song.findOne().skip(random);
    res.json(song);
});

router.post('/vote', async (req, res) => {
    const { id } = req.body;
    const song = await Song.findById(id);
    if (song) {
        song.votes += 1;
        await song.save();
        res.json({ success: true, votes: song.votes });
    } else {
        res.json({ success: false, message: 'Song not found' });
    }
});

// Nueva ruta para agregar canciones
router.post('/', async (req, res) => {
    const { title, artist, youtubeLink } = req.body;
    const newSong = new Song({ title, artist, youtubeLink, votes: 0 });
    try {
        await newSong.save();
        res.json({ success: true, song: newSong });
    } catch (error) {
        res.json({ success: false, message: 'Error al agregar la canción' });
    }
});

module.exports = router;
