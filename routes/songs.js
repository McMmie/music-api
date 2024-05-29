const express = require('express')
const app = express()
const router = express.Router()
const Song = require('../models/songs')

router.get('/', async(req, res) => {
    // Assuming you have a method to fetch song list
const all = await Song.find({song: /.*?/}).exec();
    res.json(all)
})

router.get('/:id', async(req, res) => {

    const song = await Song.findById(req.params.id)
    if (song) {
        res.json({ "lyrics": song.lyrics });
    } else {
        res.status(404).json({ "error": "Song not found" });
    }
    
})

async function getLyrics(id) {
       let song = await Song.findById(id).exec()
        if (song === null) { 
        }
        else {
            return song.lyrics
        }


}

module.exports = router