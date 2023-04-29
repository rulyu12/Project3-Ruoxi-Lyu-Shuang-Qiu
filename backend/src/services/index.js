const User = require('../models/user')
const Tweet = require('../models/tweet')
class BaseService {
  constructor(model) {
    this.model = model
    this.filename = model.name.toLowerCase()
  }

  async save(objects) {
    return await this.model.insertMany(objects)
  }

  async load() {
    return this.model.find().sort({ createdAt: -1 })
  }

  async loadLimit(limit) {
    return this.model.find().limit(limit)
  }

  async insert(object) {
    return await this.model.create(object)
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value })
  }

  async update(id, object) {
    return await this.model.findByIdAndUpdate(id, object)
  }

  async find(id) {
    return await this.model.findById(id)
  }

  async findBy(property, value) {
    return this.model.findOne({ [property]: value })
  }

  async findByCondition(condition) {
    const result = await this.model.find(condition)
    return result
  }
}

class UserService extends BaseService {
  async findByUsername(username) {
    return this.findBy('username', username)
  }
}

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

    const res = await this.removeBy('_id', tweetId)
    return res
  }

  async getUserTweet(userId) {
    const tweet = await this.findByCondition({ author: userId })
    if (!tweet) return null

    return tweet
  }
}

const userService = new UserService(User)

const tweetService = new TweetService(Tweet)

module.exports = {
  tweetService,
  userService
}
