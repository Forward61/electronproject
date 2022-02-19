import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',

      name: 'Pos001-page',
      component: require('@/components/Pos001').default

    },
    {
      path: '/Pos002/:jsonString',

      name: 'Pos002',
      props: true,

      component: require('@/components/Pos002').default

    },
    {
      path: '/Pos003',

      name: 'Pos003',
      props: true,

      component: require('@/components/Pos003').default

    },
    {
      path: '/httpClient',

      name: 'HttpclientTool-page',
      component: require('@/components/HttpClient').default

    },
    {
      path: '/tcpclient',
      name: 'tcpclient-page',
      component: require('@/components/TcpClientTool').default
    },
    {
      path: '/landing-page',
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
      name: 'stateReq-page',
      component: require('@/components/StatePage').default
    },{
      path:'/unfreezeReq',
      name: 'unfreezeReq-page',
      component: require('@/components/UnfreezePage').default
    }
  ]
})
