import store from '@/store'
import gql from 'graphql-tag'

export class AuthService {
  constructor () {
    this.LOG_IN_URL = '/users/sign_in'
    this.JWT_KEY = 'od-manager-jwt'
  }

  logIn (email, password) {
    const client = store.state.odApolloClient
    return new Promise((resolve, reject) => {
      client.mutate({ mutation: gql`mutation { signInUser(credentials:{ email:"${email}", password:"${password}" } ) { token } }` }).then(
        (success) => {
          this._store(success.data)
          resolve(true)
        },
        (error) => {
          store.dispatch('errorMessage', error)
          reject(new Error(error))
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

  _store (data) {
    const storage = {
      token: data.signInUser.token
    }
    store.state.localStorage.set(this.JWT_KEY, JSON.stringify(storage))
  }
}
