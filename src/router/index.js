import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
    name: 'Home',
    component: Home
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: () => import('../views/Room')
  },
  {
    path: '/room/phase/:id',
    name: 'Phase',
    component: () => import('../views/Phase')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
