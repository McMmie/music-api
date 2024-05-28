const express = require('express')
const db = require('./db')
// const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

db()

app.use(express.json())

const userRouter = require('.routes/users')
app.use('/post', userRouter)

// app.use(bodyParser.json());
//app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

/* const GENIUS_API_TOKEN = 'your_genius_api_token_here';
const GENIUS_BASE_URL = 'https://api.genius.com';

async function getLyricsFromGenius(songId) {
    try {
        const response = await axios.get(`${GENIUS_BASE_URL}/songs/${songId}`, {
            headers: { 'Authorization': `Bearer ${GENIUS_API_TOKEN}` }
        });
        if (response.data && response.data.response && response.data.response.song) {
            return response.data.response.song.lyrics;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

*/

app.get('/', (req, res) => {
    res.send("Welcome to the Music Lyrics API");
});

app.get('/lyrics/:song_id', async (req, res) => {
    const songId = req.params.song_id;
    const lyrics = await getLyricsFromGenius(songId);
    if (lyrics) {
        res.json({ "lyrics": lyrics });
    } else {
        res.status(404).json({ "error": "Lyrics not found" });
    }
});

app.get('/songs', (req, res) => {
    // Assuming you have a method to fetch song list
    res.json(songs);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
