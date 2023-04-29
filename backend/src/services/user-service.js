const BaseService = require('./base-service')
const User = require('../models/user')
const tweetService = require('./tweet-service')

class UserService extends BaseService {
  async findByUsername(username) {
    return this.findBy('username', username)
  }
}

module.exports = new UserService(User)
