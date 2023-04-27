import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ChartView from '../views/ChartView.vue'
import NewsView from '../views/NewsView.vue'
import ForumView from '../views/ForumView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/chart',
      name: 'chart',
      component: ChartView
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumView
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: ForumView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access_token') && to.name === 'home') {
    next({ name: 'login' })
  } 
  else if (localStorage.getItem('access_token') && to.name === 'login' || localStorage.getItem('access_token') && to.name === 'register') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
