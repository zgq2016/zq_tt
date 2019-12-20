import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
