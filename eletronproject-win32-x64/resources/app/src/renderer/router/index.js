import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LimitPage').default
    },
    {
      path: '*',
      redirect: '/'
    },{
      path:'/balanceReq',
      name: 'balance-page',
      component: require('@/components/BalancePage').default
    },{
      path:'/stateReq',
      name: 'balance-page',
      component: require('@/components/StatePage').default
    }
  ]
})
