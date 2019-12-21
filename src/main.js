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

// router.beforeEach((to, from, next) => {
//   // 只有访问那些需要授权的api的时候，才需要进行守卫
//   if (to.path.indexOf('/personal/') === 0) {
//     // 判断当前用户是否登陆过
//     let token = localStorage.getItem('zq_token')
//     if (token) { // 如果有token数据，说明登陆过了
//       next()
//     } else { // 否则，没有登陆则重新云登陆--重定向
//       next({ name: 'login' })
//     }
//   } else { // 如果访问不需要授权的页面，则自由访问
//     next()
//   }
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
