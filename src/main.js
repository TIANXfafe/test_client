import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import api from "./utils/api.js"
import auth from "./utils/auth.js"
import router from "./router/index"

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$auth = auth
Vue.prototype.$api = api

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
