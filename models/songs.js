const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    song: {
        type: String,
        required: true,

    },
    artist: {
        type: String,
        required: true,

    },
    album: {
        type: String,
        required: true,
        default: 'Unknown'
    },
    lyrics: {
        type: String,
        required: true,
        default: "You caught us unaware on this one.\nIf you know the lyrics feel free to add them"
    },
    date_added: {
        type: Date,
        required: true,
        default: Date.now
    },
    added_by: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Songs', songSchema)