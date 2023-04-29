const Tweet = require('../models/tweet')
const { tweetService } = require('../services')
const Validator = require('async-validator').default

exports.createTweet = async (req, res, next) => {
  const descriptor = {
    content: [
      { requied: true, message: 'Blog message is required' },
      {
        min: 1,
        message: 'Blog message should be between 1 and 140 characters'
      },
      {
        max: 140,
        message: 'Blog message should be between 1 and 140 characters'
      }
    ],
    author: [{ required: true, message: 'Author is required' }]
  }

  const validator = new Validator(descriptor)

  console.log('user', req.user)

  const tweetRequest = {
    content: req.body.content,
    author: req.body.user._id
  }

  try {
    await validator.validate(tweetRequest)
  } catch ({ errors }) {
    return next({ message: errors.map((e) => e.message).join('') })
  }

  let newTweet = new Tweet(tweetRequest)

  try {
    newTweet.save()

    res.status(201).send(newTweet)
  } catch (error) {
    return next(error)
  }
}

exports.editTweet = async (req, res, next) => {
  const descriptor = {
    content: [
      { requied: true, message: 'Blog message is required' },
      {
        min: 1,
        message: 'Blog message should be between 1 and 140 characters'
      },
      {
        max: 140,
        message: 'Blog message should be between 1 and 140 characters'
      }
    ],
    author: [{ required: true, message: 'Author is required' }]
  }

  const validator = new Validator(descriptor)

  console.log('user', req.user)

  const tweetRequest = {
    content: req.body.content,
    author: req.body.user._id
  }

  try {
    await validator.validate(tweetRequest)
  } catch ({ errors }) {
    return next({ message: errors.map((e) => e.message).join('') })
  }

  
  try {

    const tweets = await tweetService.update(req.params.tweetId, tweetRequest)
    res.status(200).send(tweets)

  } catch (error) {
    return next(error)
  }
}

exports.getTweets = async (req, res, next) => {
  try {
    const tweets = await tweetService.findAll()
    res.status(200).send(tweets)
  } catch (error) {
    return next(error)
  }
}

exports.getTweet = async (req, res, next) => {
  try {
    const tweet = await tweetService.find(req.params.tweetId)
    res.status(200).send(tweet)
  } catch (error) {
    return next(error)
  }
}


exports.delTweet = async (req, res, next) => {
  try {
    const result = await tweetService.delTweet(req.params.tweetId)

    res.status(200).send(result)
  } catch (error) {
    return next(error)
  }
}

exports.getUserTweet = async (req, res, next) => {
  const id = req.query.id
  try {
    const result = await tweetService.getUserTweet(id)
    res.status(200).send(result)
  } catch (error) {
    return next(error)
  }
}

