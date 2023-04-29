import axios from 'axios'

const user = {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    set_user(state, user) {
      state.user = user
    }
  },
  getters: {},
  actions: {
    async fetch_user({ commit }, username) {
      const user = await axios.get(`/api/user/${username}`)

      commit('set_user', user.data)
    }
  }
}

export default user
