import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/router/layout'
import homes from '@/views/homes'
import wenda from '@/views/wenda'
import shipin from '@/views/shipin'
import my from '@/views/my'
import search from '@/views/search'
import essay from '@/views/essay/essay.vue'
import mydata from '@/views/my-data'
Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'home',
    component: home,
    children:[
      {
        path: '',
        name: 'homes',
        component: homes,
      },
      {
        path: '/wenda',
        name: 'wenda',
        component: wenda,
      },
      {
        path: '/shipin',
        name: 'shipin',
        component: shipin,
      },
      {
        path: '/my',
        name: 'my',
        component: my,
      },

    ]
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/essay/:essayid',
    name: 'essay',
    component: essay,
    props:true
  },
  {
    path: '/user/mydata',
    name: 'mydata',
    component: mydata,
    
  }
 
]

const router = new VueRouter({
  routes
})

export default router
