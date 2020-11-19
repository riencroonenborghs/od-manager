import Vue from 'vue'
import VueResource from 'vue-resource'
import { BackgroundService } from '@/services/background_service'

Vue.use(VueResource)
const service = new BackgroundService(Vue.http)
const max = 9

setInterval(() => {
  chrome.browserAction.setBadgeText({ text: '...' })

  service.allDownloads().then(
    (downloads) => {
      let queued = downloads.filter((download, index, array) => {
        return download.status === 'queued'
      })
      if (queued.length > max) queued = `${max}+`
      else queued = queued.length

      const message = `${queued}`
      if (queued.length > 0) {
        chrome.browserAction.setBadgeBackgroundColor({ color: 'orange' })
      } else {
        chrome.browserAction.setBadgeBackgroundColor({ color: 'green' })
      }
      chrome.browserAction.setBadgeText({ text: message })
    }
  )
}, 1000 * 60)

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'OD Manager',
    title: 'Add to queue',
    contexts: ['link']
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  var url = info.linkUrl
  service.createDownload(url).then()
})
