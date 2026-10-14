import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TopicView from '../views/TopicView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/topics/:slug',
    component: TopicView,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})