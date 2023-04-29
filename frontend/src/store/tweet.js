import axios from 'axios'
const tweet = {
  namespaced: true,
  state: () => ({
    tweet: null,
    tweets: [],
    tweetId: null,
    tweetUser: null,
    tweetUserId: null,
    getTweet: null
  }),
  mutations: {
    set_tweet(state, tweet) {
      state.tweet = tweet
    },
    set_tweets(state, tweets) {
      state.tweets = tweets
    },
  },
  getters: {
    tweets: state => state.tweets
  },
  actions: {
    async create_tweet({ commit }, tweet) {
      const response = await axios.post('/api/blog', tweet)
      commit('set_tweet', response.data)
    },
    async fetch_tweets({ commit }) {
      const response = await axios.get('/api/blog')
      commit('set_tweets', response.data)
    },
    async fetch_tweet({ commit }, tweetId) {
      const response = await axios.get(`/api/blog/${tweetId}`)
      commit('set_tweet', response.data)
    },
    async init({ dispatch }) {
      await dispatch('fetch_tweets')
    },
    async delete({commit, dispatch}, tweetId) {
      const res = await axios.delete(`/api/blog/${tweetId}`);
      dispatch('init');
    },
    async edit_tweet({dispatch}, {tweetId, data}) {
      const res = await axios.put(`/api/blog/${tweetId}`, data);
      dispatch('init');
    }
  }
}

export default tweet
