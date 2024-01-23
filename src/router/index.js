// Clayton DeSimone
// Client Side Programming
// Task 2
// 12/11/2023

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/characterdesign',
    name: 'characterDesign',
    component: () =>
    import(/* webpackChunkName: "bundle.parts" */ '../views/CharacterDesign.vue'),
  },
  {
    path: '/questselect',
    name: 'questSelect',
    component: () =>
    import(/* webpackChunkName: "bundle.parts" */ '../views/QuestSelect.vue'),
  },
  {
    path: '/journey',
    name: 'journey',
    component: () =>
    import(/* webpackChunkName: "bundle.parts" */ '../views/Journey.vue'),
  },
  {
    path: '/result',
    name: 'result',
    component: () =>
    import(/* webpackChunkName: "bundle.parts" */ '../views/Result.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
