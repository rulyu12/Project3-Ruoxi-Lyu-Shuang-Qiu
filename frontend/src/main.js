import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/styles/index.scss'
import Toasted from 'vue-toasted'
import moment from 'moment'
import VueSkeletonLoader from 'skeleton-loader-vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import AuthLayout from './layouts/AuthLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.component('auth-layout', AuthLayout)
Vue.component('default-layout', DefaultLayout)
Vue.use(Toasted)
Vue.component(VueSkeletonLoader)
Vue.prototype.moment = moment
Vue.config.productionTip = false


async function main() {
  let storeInstance = await store()

  new Vue({
    router: router(storeInstance),
    store: storeInstance,
    render: h => h(App)
  }).$mount('#app')
}

main()
