import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home', // 主页
    name: 'home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/diagrams', // 图表页
    name: 'diagrams',
    component: () => import('../views/Diagrams/index.vue')
  },
  {
    path: '/diagraming/:id', // 图表页
    name: 'diagraming',
    component: () => import('../views/Diagraming/index.vue')
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router;