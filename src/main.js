import Vue from 'vue'
import VueFlex from 'vue-flex'
import 'vue-flex/dist/vue-flex.css'
import { MdToolbar, MdButton, MdIcon, MdField, MdSnackbar, MdTabs, MdList, MdBadge, MdEmptyState, MdDialog, MdMenu } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

import store from '@/store' // loads VueResource, VueLocalStorage because we need it there
import router from '@/router'
import App from '@/App.vue'

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
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('loadSettings')
  }
}).$mount('#app')
