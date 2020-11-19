<template>
  <div>
    <md-tabs md-sync-route>
      <template slot="md-tab" slot-scope="{ tab }">
        <flex-col noWrap align-h="center">
          <flex-row noWrap align-h="center">
            <md-icon>{{tab.data.icon}}</md-icon>
            <md-badge v-if="tab.data.badge > 0" :md-content="tab.data.badge" md-dense md-position="top">
              &nbsp;
            </md-badge>
          </flex-row>
          <span>{{ tab.label }}</span>
        </flex-col>
      </template>

      <md-tab id="tab-queued"
              md-label="Queued"
              :md-template-data="{ icon: 'list', badge: queuedDownloads.length }"
              to="/downloads/queued" exact>
        <DownloadsList  :downloads="queuedDownloads"
                        :type="'queued'"
                        :icon="'list'"></DownloadsList>
      </md-tab>
      <md-tab id="tab-started"
              md-label="Started"
              :md-template-data="{ icon: 'get_app', badge: startedDownloads.length }"
              to="/downloads/started" exact>
        <DownloadsList  :downloads="startedDownloads"
                        :type="'started'"
                        :icon="'get_app'">></DownloadsList>
      </md-tab>
      <md-tab id="tab-finished"
              md-label="Finished"
              :md-template-data="{ icon: 'check', badge: finishedDownloads.length }"
              to="/downloads/finished" exact>
        <DownloadsList  :downloads="finishedDownloads"
                        :type="'finished'"
                        :icon="'check'">></DownloadsList>
      </md-tab>
      <md-tab id="tab-failed"
              md-label="Failed"
              :md-template-data="{ icon: 'priority_high', badge: failedDownloads.length }"
              to="/downloads/failed" exact>
        <DownloadsList  :downloads="failedDownloads"
                        :type="'error'"
                        :icon="'priority_high'">></DownloadsList>
      </md-tab>
      <md-tab id="tab-cancelled"
              md-label="Cancelled"
              :md-template-data="{ icon: 'close', badge: cancelledDownloads.length }"
              to="/downloads/cancelled" exact>
        <DownloadsList  :downloads="cancelledDownloads"
                        :type="'cancelled'"
                        :icon="'close'">></DownloadsList>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import DownloadsList from '@/components/DownloadsList'
import { mapState } from 'vuex'

export default {
  name: 'Downloads',
  components: { DownloadsList },
  created () {
    this.$store.dispatch('loadDownloads')
  },
  computed: {
    queuedDownloads: function () {
      return this.downloads.filter(function (download) {
        return download.status === 'queued'
      }).sort((firstElement, secondElement) => {
        if (firstElement.queuedAt === secondElement.queuedAt) return 0
        return firstElement.queuedAt < secondElement.queuedAt ? -1 : 1
      })
    },
    startedDownloads: function () {
      return this.downloads.filter(function (download) {
        return download.status === 'started'
      }).sort((firstElement, secondElement) => {
        if (firstElement.startedAt === secondElement.startedAt) return 0
        return firstElement.startedAt < secondElement.startedAt ? -1 : 1
      })
    },
    finishedDownloads: function () {
      return this.downloads.filter(function (download) {
        return download.status === 'finished'
      }).sort((firstElement, secondElement) => {
        if (firstElement.finishedAt === secondElement.finishedAt) return 0
        return firstElement.finishedAt < secondElement.finishedAt ? -1 : 1
      })
    },
    failedDownloads: function () {
      return this.downloads.filter(function (download) {
        return download.status === 'error'
      }).sort((firstElement, secondElement) => {
        if (firstElement.finishedAt === secondElement.finishedAt) return 0
        return firstElement.finishedAt < secondElement.finishedAt ? -1 : 1
      })
    },
    cancelledDownloads: function () {
      return this.downloads.filter(function (download) {
        return download.status === 'cancelled'
      }).sort((firstElement, secondElement) => {
        if (firstElement.cancelledAt === secondElement.cancelledAt) return 0
        return firstElement.cancelledAt < secondElement.cancelledAt ? -1 : 1
      })
    },
    ...mapState({
      downloads: function (state) {
        return state.downloads || []
      }
    })
  }
}
</script>

<style scoped lang="scss">
.md-badge { margin-right: 4px; }
</style>
