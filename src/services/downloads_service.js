import store from '@/store'
import { Download } from '@/models/download'

export class DownloadsService {
  constructor (http) {
    this.http = http
    this.ALL_URL = '/api/v1/downloads.json'
    this.POST_URL = '/api/v1/downloads.json'
  }

  all () {
    return new Promise((resolve, reject) => {
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

  save (download) {
    return new Promise((resolve, reject) => {
      const options = { emulateJSON: true }
      const data = { download: download.asJSON }
      this.http.post(this._buildUrl(this.POST_URL), data, options).then(
        (data) => {
          resolve(true)
        }
      )
    })
  }

  _buildUrl (path) {
    return `${store.state.settings.protocol}://${store.state.settings.hostname}:${store.state.settings.port}${path}`
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
