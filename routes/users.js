const express = require('express')
const router = express.Router()
const User =  require('../models/user')
const Song = require('../models/songs')
const { router: authRouter, verifyToken } = require('../auth')

// add user authentication
// if user logs in, provide token
router.post('/post', verifyToken, async(req, res) => {
    // Log the user's action (this can be extended to log more details)
    let post = new Song({
        song: req.body.song,
        artist: req.body.artist,
        lyrics: req.body.lyrics,
        added_by: req.user.username
    })
    
    try {
        const newSong = await post.save()
        res.status(201).json(newSong)
    } catch (err) {
        res.status(400).json({message: err.message})        
    }

   console.log(`${req.user.username} posted: ${req.body.song}`);
   // res.json();
});



router.get('/', (req, res) => {
    res.send('all posts')
})

router
.route('/comment/comment_id', findComment)
.get((req, res) => {
    
}).delete((req, res) => {

}).patch((req, res) => {

})

router.post('/like', (req, res) => {
    
})

router.post('/upload', (req, res) => {
    
})

async function findComment(req, res, next) {
    let comment
    try {
        comment = await Comment.findById(req.params.id)
        if (comment === null) {
            return res.status(404).json({'error': "comment not found"})
        }
    } catch (error) {
        return res.status(400).json({message: error.message})
    }

    res.comment = comment
}

module.exports = router