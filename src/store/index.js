import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import Vuex from 'vuex'
import { AuthService } from '@/services/auth_service'
import { DownloadsService } from '@/services/downloads_service'
import { SettingsService } from '@/services/settings_service'
import router from '@/router'

Vue.use(VueResource)
Vue.use(VueLocalStorage)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authService: new AuthService(Vue.http),
    downloadsService: new DownloadsService(Vue.http),
    settingsService: new SettingsService(),
    settings: {},
    authenticated: false,
    localStorage: Vue.localStorage,
    message: {
      message: null,
      type: 'success'
    },
    fetchingDownloads: false,
    downloads: []
  },
  mutations: {
    message (state, message) {
      state.message.message = message
    },
    messageType (state, messageType) {
      state.message.type = messageType
    },
    authenticated (state, bool) {
      state.authenticated = bool
    },
    downloads (state, downloads) {
      state.downloads = downloads
    },
    settings (state, settings) {
      state.settings = settings
    },
    fetchingDownloads (state, fetchingDownloads) {
      state.fetchingDownloads = fetchingDownloads
    }
  },
  actions: {
    loadSettings (context) {
      context.state.settingsService.load()
    },
    saveSettings (context, settings) {
      context.state.settingsService.save()
    },
    successMessage (context, message) {
      context.commit('messageType', 'success')
      context.commit('message', message)
    },
    errorMessage (context, message) {
      context.commit('messageType', 'error')
      context.commit('message', message)
    },
    loadDownloads (context) {
      context.commit('fetchingDownloads', true)
      context.state.downloadsService.all().then(
        (data) => {
          context.commit('fetchingDownloads', false)
          context.commit('downloads', data)
        }
      ).catch(
        (error) => {
          context.commit('fetchingDownloads', false)
          if (error.status === 401) {
            context.dispatch('errorMessage', 'not authenticated')
            context.state.authService.logOut()
            router.push({ name: 'auth' })
          }
        }
      )
    }
  },
  modules: {
  }
})
