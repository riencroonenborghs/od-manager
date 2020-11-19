// class specifically for the Chrome background script
// The idea is that the Chrome extension loads popup.html, which has the background.js
// background.js loads an instance of Vue and calls this class for downloads
// We do this because the popup has localStorage settings that this class will use to call the server (host, port, jwt token, ...)
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

export class BackgroundService {
  constructor (http) {
    this.SETTINGS_KEY = 'od-manager-settings'
    this.JWT_KEY = 'od-manager-jwt'
    this.ALL_DOWNLOADS_URL = '/api/v1/downloads'
    this.CREATE_DOWNLOAD_URL = '/api/v1/downloads'

    this.http = http
    this.settings = this.loadSettings()
    this.jwt = this.loadJWT()

    this.http.interceptors.push((request) => {
      request.headers.set('Authorization', this.jwt.token)
    })
  }

  allDownloads () {
    return new Promise((resolve, reject) => {
      this.http.get(this.buildUrl(this.ALL_DOWNLOADS_URL)).then(
        (data) => {
          resolve(data.body)
        }
      )
    })
  }

  createDownload (url) {
    return new Promise((resolve, reject) => {
      const data = {
        download: JSON.stringify({
          url: url
        })
      }
      this.http.post(
        this.buildUrl(this.CREATE_DOWNLOAD_URL),
        data
      ).then(
        (data) => {
          alert(data)
          resolve(true)
        }
      )
    })
  }

  loadSettings () {
    return JSON.parse(
      Vue.localStorage.get(
        this.SETTINGS_KEY
      )
    )
  }

  loadJWT () {
    return JSON.parse(
      Vue.localStorage.get(
        this.JWT_KEY
      )
    )
  }

  buildUrl (path) {
    return `${this.settings.protocol}://${this.settings.hostname}:${this.settings.port}${path}`
  }
}
