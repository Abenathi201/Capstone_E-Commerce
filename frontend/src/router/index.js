import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // {
  //   path: '/contact',
  //   name: 'contact',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/ContactView.vue')
  // },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductsView.vue')
  },
  {
    path: '/product/:productID',
    name: 'product',
    component: () => import(/* webpackChunkName: "about" */ '../components/SingleProduct.vue')
  },
  {
    path: '/user/:userID',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../components/SingleUser.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../components/CartComp.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../components/Register.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsersView.vue')
  },
  {
    path: '/user/:userID',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../components/SingleUser.vue')
  },
  {
    path: '/userProfile',
    name: 'userProfile',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserProfile.vue')
  },
  {
    path: '/addProducts',
    name: 'addProducts',
    component: () => import(/* webpackChunkName: "about" */ '../components/AddProducts.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/updateProduct/:id',
    name: 'updateProduct',
    component: () => import(/* webpackChunkName: "about" */ '../components/UpdateProduct.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
