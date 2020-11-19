import Vue from 'vue'
import VueResource from 'vue-resource'
import { BackgroundDownloadsService } from '@/services/background_downloads_service'

Vue.use(VueResource)
const service = new BackgroundDownloadsService(Vue.http)

// browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('Hello from the background')
// })

let time = 0
setInterval(function () {
  chrome.browserAction.setBadgeText({ text: time.toString() })
  ++time
  service.all().then(
    (downloads) => {
      console.log(downloads)
    }
  )
}, 1000 * 5)
