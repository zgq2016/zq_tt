import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Personal from '@/views/personal.vue'
import Editdata from '@/views/editdata.vue'
import Register from '@/views/register.vue'
import Index from '@/views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    redirect: {
      name: 'Index'
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
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  }
]

const router = new VueRouter({
  routes
})

export default router
