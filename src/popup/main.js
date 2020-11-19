import Vue from 'vue'
import VueFlex from 'vue-flex'
import 'vue-flex/dist/vue-flex.css'
import { MdToolbar, MdButton, MdIcon, MdField, MdSnackbar, MdTabs, MdList, MdBadge, MdEmptyState, MdDialog, MdMenu, MdCheckbox, MdProgress } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

import store from '@/store' // loads VueResource, VueLocalStorage because we need it there
import router from '@/router'
import App from '@/popup/App.vue'

Vue.use(VueFlex)
Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdIcon)
Vue.use(MdField)
Vue.use(MdSnackbar)
Vue.use(MdTabs)
Vue.use(MdList)
Vue.use(MdBadge)
Vue.use(MdEmptyState)
Vue.use(MdDialog)
Vue.use(MdMenu)
Vue.use(MdCheckbox)
Vue.use(MdProgress)
Vue.config.productionTip = false

Vue.http.interceptors.push(function (request) {
  if (store?.state?.authService?.token) {
    request.headers.set('Authorization', store.state.authService.token)
  }
  // return function (response) {
  //   if (response.status === 401) {
  //     store.state.authenticated = false
  //   }
  // }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('loadSettings')
  }
}).$mount('#app')
