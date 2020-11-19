import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

export class BackgroundDownloadsService {
  constructor (http) {
    this.http = http
    this.SETTINGS_KEY = 'od-manager-settings'
    this.ALL_URL = '/api/v1/downloads'
    this.loadSettings()
  }

  all () {
    return new Promise((resolve, reject) => {
      this.http.get(this.buildUrl(this.ALL_URL)).then(
        (data) => {
          resolve(data.body)
        }
      )
    })
  }

  loadSettings () {
    this.settings = JSON.parse(
      Vue.localStorage.get(
        this.SETTINGS_KEY
      )
    )
  }

  buildUrl (path) {
    return `${this.settings.protocol}://${this.settings.hostname}:${this.settings.port}${path}`
  }
}
