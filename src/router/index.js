import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/home',
    component: () => import('../views/Home/index.vue'),
    children: [
      {
        path: 'diagrams',
        component: () => import('../views/Diagrams/index.vue')
      },
      {
        path: 'history',
        component: () => import('../views/History/index.vue')
      },
      {
        path: 'colla',
        component: () => import('../views/Colla/index.vue')
      },
      {
        path: 'trash',
        component: () => import('../views/Trash/index.vue')
      },
    ]
  },
  {
    path: '/home', // 主页
    name: 'home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/signup', // 注册页
    name: 'home',
    component: () => import('../views/SignUp/index.vue')
  },
  {
    path: '/signin', // 登陆页
    name: 'home',
    component: () => import('../views/SignIn/index.vue')
  },
  {
    path: '/diagrams', // 图表页
    name: 'diagrams',
    component: () => import('../views/Diagrams/index.vue')
  },
  // {
  //   path: '/diagraming', // 图表页
  //   name: 'diagraming',
  //   component: () => import('../views/Diagraming/index.vue')
  // },
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