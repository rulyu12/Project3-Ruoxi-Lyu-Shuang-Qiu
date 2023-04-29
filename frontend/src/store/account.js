import axios from 'axios'

const account = {
  namespaced: true,
  state: () => ({
    user: null
  }),

  mutations: {
    set_user(state, user) {
      state.user = user
    }
  },
  getters: {
    isLoggedIn: state => (state.user ? true : false),
    user: state => state.user
  },
  actions: {
    async init({ dispatch }) {
      await dispatch('fetch_session')
    },
    async register_user(store, user) {
      return axios.post('/api/auth/register', { user })
    },
    async login({ commit }, credentials) {
      const user = await axios.post('/api/auth/session', credentials)

      commit('set_user', user.data)
    },
    async logout({ commit }) {
      await axios.delete('/api/auth/session')

      commit('set_user', null)
    },
    async fetch_session({ commit }) {
      const user = await axios.get('/api/auth/session')

      commit('set_user', user.data)
    }
  }
}

export default account
