import Vue from 'vue'
import VueResource from 'vue-resource'
import { DownloadsService } from '@/services/downloads_service'

setInterval(function () {
  chrome.browserAction.setBadgeText({ text: '...' })

  Vue.use(VueResource)
  const service = DownloadsService(Vue.http)
  service.all().then(
    (downloads) => {
      const started = downloads.filter((download, index, array) => {
        return download.status === 'started'
      })
      chrome.browserAction.setBadgeText({ text: started.length.toString() })
    }
  )
}, 1000 * 60)
