import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Personal from '@/views/personal.vue'
import Editdata from '@/views/editdata.vue'

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
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/editdata',
    name: 'Editdata',
    component: Editdata
  }
]

const router = new VueRouter({
  routes
})

export default router
