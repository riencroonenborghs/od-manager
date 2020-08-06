import store from '@/store'

export class SettingsService {
  constructor (http) {
    this.http = http
    this.DEFAULT_PROTOCOL = 'http'
    this.DEFAULT_HOSTNAME = 'localhost'
    this.DEFAULT_PORT = 80
    this.SETTINGS_KEY = 'od-manager-settings'
  }

  load () {
    if (store.state.localStorage == null) {
      this._setDefaults()
      return
    }

    const settings = JSON.parse(
      store.state.localStorage.get(
        this.SETTINGS_KEY
      )
    )
    if (settings == null) {
      this._setDefaults()
      return
    }

    store.commit('settings', settings)
  }

  save () {
    store.state.localStorage.set(this.SETTINGS_KEY, JSON.stringify(store.state.settings))
  }

  _setDefaults () {
    const defaults = {
      protocol: this.DEFAULT_PROTOCOL,
      hostname: this.DEFAULT_HOSTNAME,
      port: this.DEFAULT_PORT
    }
    store.commit('settings', defaults)
  }
}
