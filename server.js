const express = require('express')
const db = require('./db')
const session = require('express-session');
const { router: authRouter, verifyToken } = require('./auth');
// const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

db()

app.use(express.json())
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

const songRouter = require('./routes/songs')
const userRouter = require('./routes/users')
app.use('/song', songRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)


//app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Music Lyrics API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
