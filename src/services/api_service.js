import store from '@/store'

export class ApiService {
  constructor (http) {
    this.http = http
  }

  buildUrl (path, download = null) {
    let url = `${store.state.settings.protocol}://${store.state.settings.hostname}:${store.state.settings.port}${path}`
    if (download) { url = url.replace(':id', download.id) }
    return url
  }

  camelize (str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    }).replace(/\s+/g, '')
  }
}
