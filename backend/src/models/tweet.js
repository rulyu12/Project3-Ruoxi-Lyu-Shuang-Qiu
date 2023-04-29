const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 140
    },
    author: {
      type: 'ObjectId',
      ref: 'User',
      autopopulate: {
        maxDepth: 2
      },
      required: true
    },
    createdAt: Date,
    originalTweet: String,
  },
  { timestamps: true }
)

TweetSchema.plugin(autopopulate)

module.exports = mongoose.model('Tweet', TweetSchema)
