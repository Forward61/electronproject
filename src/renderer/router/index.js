import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {

      path: '/Pos001',
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

    },{
      path:'/Nw10',
      name: 'Nw10-page',
      component: require('@/components/Nw10Page').default
    }, {
      path:'',
      name: 'Wz02-page',
      component: require('@/components/Wz02Page').default
    },{
      path:'/Wz04',
      name: 'Wz04-page',
      component: require('@/components/Wz04Page').default
    },{
      path:'/Nw43',
      name: 'Nw43-page',
      component: require('@/components/Nw43Page').default
    }
  ]
})
