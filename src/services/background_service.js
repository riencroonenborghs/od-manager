// class specifically for the Chrome background script
// The idea is that the Chrome extension loads popup.html, which has the background.js
// background.js loads an instance of Vue and calls this class for downloads
// We do this because the popup has localStorage settings that this class will use to call the server (host, port, jwt token, ...)
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

Vue.use(VueLocalStorage)
Vue.use(VueApollo)

export class BackgroundService {
  constructor () {
    this.SETTINGS_KEY = 'od-manager-settings'
    this.JWT_KEY = 'od-manager-jwt'
    this.ALL_DOWNLOADS_URL = '/api/v1/downloads'
    this.CREATE_DOWNLOAD_URL = '/api/v1/downloads'

    this.jwt = this.loadJWT()
    const settings = this.loadSettings()
    const path = '/graphql'
    const uri = `${settings.protocol}://${settings.hostname}:${settings.port}${path}`
    this.odApolloClient = new ApolloClient({ uri: uri })
  }

  query (query) {
    return this.odApolloClient.query({
      query: gql`${query}`,
      context: {
        headers: {
          Authorization: this.jwt.token
        }
      },
      fetchPolicy: 'no-cache'
    })
  }

  mutate (mutation) {
    return this.odApolloClient.mutate({
      mutation: gql`${mutation}`,
      context: {
        headers: {
          Authorization: this.jwt.token
        }
      },
      fetchPolicy: 'no-cache'
    })
  }

  allDownloads () {
    const query = 'query { downloads { id status } }'
    return new Promise((resolve, reject) => {
      this.query(query).then(
        (success) => {
          resolve(success.data.downloads)
        }
      )
    })
  }

  createDownload (url) {
    const mutation = `mutation { createDownload ( url: ${url} ) { id } }`
    return new Promise((resolve, reject) => {
      this.mutate(mutation).then(
        (success) => {
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
}
