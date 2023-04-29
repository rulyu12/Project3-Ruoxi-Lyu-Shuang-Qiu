const BaseService = require('./base-service')
const Tweet = require('../models/tweet')
const userService = require('./user-service')

class TweetService extends BaseService {
  async findAll() {
    return this.load()
  }

  async loadWithLimit(limit) {
    return this.loadLimit(limit)
  }

  async delTweet(tweetId) {

    const tweet = await this.findBy('_id', tweetId)
    if (!tweet) return null

    const res = await this.removeBy('_id', tweetId);
    return res;
  }

  async getUserTweet(userId) {
    const tweet = await this.findByCondition({ author: userId })
    if (!tweet) return null
    
    return tweet
  }
}

module.exports = new TweetService(Tweet)
