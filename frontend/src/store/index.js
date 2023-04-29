import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import account from './account'
import tweet from './tweet'
import user from './user'

Vue.use(Vuex)

axios.defaults.baseURL = `http://localhost:3000`

axios.defaults.withCredentials = true

const store = new Vuex.Store({
  modules: {
    account,
    tweet,
    user
  }
})

export default async function init() {
  await store.dispatch('account/init')
  await store.dispatch('tweet/init')

  return store
}
