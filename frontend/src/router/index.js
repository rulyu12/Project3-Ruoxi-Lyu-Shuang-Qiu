import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import TweetDetail from '../views/TweetDetail.vue'

Vue.use(VueRouter)

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/register',
        name: 'register',
        meta: { layout: 'auth' },
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.account.user) return next('/')
          return next()
        }
      },
      {
        path: '/login',
        name: 'auth',
        meta: { layout: 'auth' },
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.account.user) return next('/')
          return next()
        }
      },
      {
        path: '/',
        name: 'Home',
        meta: { layout: 'default' },
        component: Home,
      },
      {
        path: '/home',
        name: 'Home',
        meta: { layout: 'default' },
        component: Home,
        beforeEnter(to, from, next) {
          if (!store.state.account.user) return next('/login')
          return next()
        }
      },
      {
        path: '/:username/status/:tweetId',
        name: 'TweetDetail',
        meta: { layout: 'default' },
        component: TweetDetail,
      },
      {
        path: '/users/:userId',
        name: 'User',
        meta: {
          layout: 'default',
          showUser: true
        },
        component: User,
      },
    ]
  })
}
