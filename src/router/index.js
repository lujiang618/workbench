import Vue from 'vue'
import Router from 'vue-router'
import Hi from '@/components/hi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Hi
    }
  ]
})
