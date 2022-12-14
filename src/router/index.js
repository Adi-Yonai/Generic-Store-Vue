import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import itemView from '../views/itemView.vue'
import itemApp from '../components/item-app.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/items/:itemId',
      name: 'item',
      component: itemView
    },
    {
      path: '/items',
      name: 'store',
      component: itemApp,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: ':id',
          name: 'itemDet',
          component: () => import('../components/item-details.vue'),
        }],
        alias: '/'
      },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ],
  
})



export default router
