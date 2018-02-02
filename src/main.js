// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in
import Vue from 'vue'
import App from './App'
import router from './router/index'
import 'common/stylus/index.styl'
import store from './store'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'//图片懒加载
//import vconsole from 'vconsole'


fastclick.attach(document.body)
Vue.use(lazyload,{
	loading:require('common/image/default.png')
	
	
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
