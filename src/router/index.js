import { createRouter, createWebHistory } from 'vue-router'
import LatestAsteroid from '../views/LatestAsteroid.vue'

const routes = [
  {
    path: '/',
    name: 'latest',
    component: LatestAsteroid
  },
  {
    path: '/more',
    name: 'more',
    component: () => import('../views/MoreAsteroids.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
