import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from "../views/Layout/index"


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import('../views/Login/loginIndex.vue')
  },
  {
    path: '/console',
    name: 'Console',
    hidden: false,
    meta: {
      name: "控制台",
      icon: 'console'
    },
    component: layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/consoleIndex.vue")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    hidden: false,
    meta: {
      name: "信息管理",
      icon: 'info'
    },
    component: layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue")
      },
      {
        path: "/infoDetailed",
        name: "InfoDetailed",
        hidden: true,
        meta: {
          name: "信息详情"
        },
        component: () => import("../views/Info/detailed.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    hidden: false,
    meta: {
      name: "用户管理",
      icon: 'user'
    },
    component: layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
