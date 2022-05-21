import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // redirect: '/home',
    component: () => import('../views/Home/index.vue'),
    children: [
      {
        path: 'diagrams',
        name: 'diagrams',
        component: () => import('../views/Diagrams/index.vue')
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('../views/History/index.vue')
      },
      {
        path: 'colla',
        name: 'colla',
        component: () => import('../views/Colla/index.vue')
      },
      {
        path: 'trash',
        name: 'trash',
        component: () => import('../views/Trash/index.vue')
      },
    ]
  },
  {
    path: '/signup', // 注册页
    name: 'home',
    component: () => import('../views/SignUp/index.vue')
  },
  {
    path: '/signin', // 登陆页
    name: 'signin',
    component: () => import('../views/SignIn/index.vue')
  },
  {
    path: '/diagrams', // 图表页
    name: 'diagrams',
    component: () => import('../views/Diagrams/index.vue')
  },
  {
    path: '/account', // 个人空间页
    name: 'account',
    component: () => import('../views/Account/index.vue')
  },
  {
    path: '/diagraming/:id', // 图表页
    name: 'diagraming',
    component: () => import('../views/Diagraming/index.vue')
  },
  {
    path: '/view/:id', // 图表页
    name: 'view',
    component: () => import('../views/Diagraming/index.vue')
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})
router.beforeEach( async (to, from, next) => {
  
  next()
});
export default router;