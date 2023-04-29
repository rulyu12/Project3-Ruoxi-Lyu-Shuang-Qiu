const tweetController = require('../controllers/tweet.js')

const router = require('express').Router()

router.get('/getUserTweet', tweetController.getUserTweet)

router.post('/', tweetController.createTweet)

router.get('/', tweetController.getTweets)

router.get('/:tweetId', tweetController.getTweet)

router.delete('/:tweetId', tweetController.delTweet)

router.put('/:tweetId', tweetController.editTweet);


module.exports = router
