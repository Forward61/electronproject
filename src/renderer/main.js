import Vue from 'vue'
import axios from 'axios'
import x2js from 'x2js'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// highlight.js代码高亮插件
import Highlight from '../utils/highlight'; // 这里是你项目highlight.js所在路径

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.use(Highlight);
Vue.prototype.$x2js = new x2js()
// Vue.x2js = Vue.prototype.$x2js = x2js

/* eslint-disable no-new */


// Vue.directive('highlight',function (el) {
//   let blocks = el.querySelectorAll('pre code');
//   blocks.forEach((block)=>{
//     high.highlightBlock(block)
//   })
// })


new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
