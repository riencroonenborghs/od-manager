import store from '@/store'
import { Download } from '@/models/download'

export class DownloadsService {
  constructor (http) {
    this.http = http

    this.PROTOCOL = 'http'
    this.HOST = 'mother'
    this.PORT = 80
    this.ALL_URL = '/api/v1/downloads.json'
  }

  all () {
    return new Promise((resolve, reject) => {
      const token = store.state.authService.token
      this.http.headers.common.Authorization = token
      this.http.get(this._buildUrl(this.ALL_URL)).then(
        (data) => {
          const downloads = data.body.map(
            (item) =>
              Object.assign(
                new Download(),
                this._toDownloadData(item)
              )
          )
          resolve(downloads)
        }
      )
    })
  }

  _buildUrl (path) {
    return `${this.PROTOCOL}://${this.HOST}:${this.PORT}${path}`
  }

  _toDownloadData (item) {
    Object.keys(item).forEach((key) => {
      const newKey = this._camelize(key.replace('_', ' '))
      const value = item[key]
      delete item[key]
      item[newKey] = value
    })
    return item
  }

  _camelize (str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    }).replace(/\s+/g, '')
  }
}
