import store from '@/store'

export class AuthService {
  constructor (http) {
    this.http = http
    this.LOG_IN_URL = '/users/sign_in'
    this.JWT_KEY = 'od-manager-jwt'
  }

  logIn (email, password) {
    const data = {
      user: {
        email: email,
        password: password
      }
    }
    return new Promise((resolve, reject) => {
      this.http.post(this._buildUrl(this.LOG_IN_URL), data).then(
        (success) => {
          this._store(success.body)
          resolve(true)
        },
        (error) => {
          console.error('ERROR')
          console.error(error)
          if (error.body) {
            const errorMessage = error.body.error
            store.dispatch('errorMessage', errorMessage)
            reject(new Error(errorMessage))
          } else {
            const errorMessage = 'something\'s gone wrong'
            store.dispatch('errorMessage', errorMessage)
            reject(new Error(errorMessage))
          }
        }
      )
    })
  }

  logOut () {
    store.state.localStorage.set(this.JWT_KEY, '')
    store.commit('authenticated', false)
  }

  get authenticated () {
    if (store.state.localStorage == null) {
      store.commit('authenticated', false)
      return false
    }
    const jwt = JSON.parse(
      store.state.localStorage.get(
        this.JWT_KEY
      )
    )
    if (jwt == null) {
      store.commit('authenticated', false)
      return false
    }
    if (jwt.expires - new Date() < 0) {
      store.commit('authenticated', false)
      return false
    }
    store.commit('authenticated', true)
    return true
  }

  get token () {
    if (store.state.localStorage == null) return null
    const jwt = JSON.parse(
      store.state.localStorage.get(
        this.JWT_KEY
      )
    )
    return jwt?.token
  }

  _buildUrl (path) {
    return `${store.state.settings.protocol}://${store.state.settings.hostname}:${store.state.settings.port}${path}`
  }

  _store (data) {
    const storage = {
      expires: new Date(data.exp),
      token: data.token
    }
    store.state.localStorage.set(this.JWT_KEY, JSON.stringify(storage))
  }
}
