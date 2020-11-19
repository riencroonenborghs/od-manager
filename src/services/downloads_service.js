import { ApiService } from '@/services/api_service'
import { Download } from '@/models/download'

export class DownloadsService extends ApiService {
  constructor (http) {
    super(http)
    this.ALL_URL = '/api/v1/downloads'
    this.POST_URL = '/api/v1/downloads'
    this.QUEUE_URL = '/api/v1/downloads/:id/queue'
    this.CANCEL_URL = '/api/v1/downloads/:id/cancel'
    this.DELETE_URL = '/api/v1/downloads/:id'
  }

  all () {
    return new Promise((resolve, reject) => {
      this.http.get(
        this.buildUrl(this.ALL_URL)
      ).then(
        (data) => {
          const downloads = data.body.map(
            (item) =>
              Object.assign(
                new Download(),
                this.parseData(item)
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
      this.http.post(
        this.buildUrl(this.POST_URL),
        data
      ).then(
        (data) => {
          resolve(true)
        }
      )
    })
  }

  queue (download) {
    return new Promise((resolve, reject) => {
      const url = this.buildUrl(this.QUEUE_URL, download)
      this.http.put(url).then(
        (data) => {
          resolve(true)
        }
      )
    })
  }

  cancel (download) {
    return new Promise((resolve, reject) => {
      const url = this.buildUrl(this.CANCEL_URL, download)
      this.http.put(url).then(
        (data) => {
          resolve(true)
        }
      )
    })
  }

  remove (download) {
    return new Promise((resolve, reject) => {
      const url = this.buildUrl(this.DELETE_URL, download)
      this.http.delete(url).then(
        (data) => {
          resolve(true)
        }
      )
    })
  }

  parseData (item) {
    Object.keys(item).forEach((key) => {
      const newKey = this.camelize(key.replace('_', ' '))
      const value = item[key]
      delete item[key]
      item[newKey] = value
    })
    return item
  }
}
