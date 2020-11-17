import store from '@/store'
import { Download } from '@/models/download'

export class DownloadsService {
  constructor (http) {
    this.http = http
    this.ALL_URL = '/api/v1/downloads'
    this.POST_URL = '/api/v1/downloads'
    this.QUEUE_URL = '/api/v1/downloads/:id/queue'
    this.CANCEL_URL = '/api/v1/downloads/:id/cancel'
    this.DELETE_URL = '/api/v1/downloads/:id'
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
      const data = { download: download.asJSON }
      this.http.post(this._buildUrl(this.POST_URL), data).then(
        (data) => {
          resolve(true)
        }
      )
    })
  }

  queue (download) {
    return new Promise((resolve, reject) => {
      const url = this._buildUrl(this.QUEUE_URL, download)
      this.http.put(url).then(
        (data) => {
          resolve(true)
        }
      )
    })
  }

  cancel (download) {
    return new Promise((resolve, reject) => {
      const url = this._buildUrl(this.CANCEL_URL, download)
      this.http.put(url).then(
        (data) => {
          resolve(true)
        }
      )
    })
  }

  remove (download) {
    return new Promise((resolve, reject) => {
      const url = this._buildUrl(this.DELETE_URL, download)
      this.http.delete(url).then(
        (data) => {
          resolve(true)
        }
      )
    })
  }

  _buildUrl (path, download = null) {
    let url = `${store.state.settings.protocol}://${store.state.settings.hostname}:${store.state.settings.port}${path}`
    if (download) { url = url.replace(':id', download.id) }
    return url
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
