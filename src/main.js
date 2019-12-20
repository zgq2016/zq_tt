import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/reset.css'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('zq_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next({
      name: 'Login'
    })
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
