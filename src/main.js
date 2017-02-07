// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import VueCodeMirror from 'vue-codemirror'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.use(VueCodeMirror)

Vue.material.registerTheme({
  default: {
    primary: 'indigo',
    accent: 'pink'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
