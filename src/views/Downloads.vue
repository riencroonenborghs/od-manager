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

export default {
  name: 'Downloads',
  components: { DownloadsList },
  created () {
    this.$store.dispatch('loadDownloads')
  },
  computed: {
    queuedDownloads: function () {
      return this.$store.state.downloads.filter(function (download) {
        return download.status === 'queued'
      })
    },
    startedDownloads: function () {
      return this.$store.state.downloads.filter(function (download) {
        return download.status === 'started'
      })
    },
    finishedDownloads: function () {
      return this.$store.state.downloads.filter(function (download) {
        return download.status === 'finished'
      })
    },
    failedDownloads: function () {
      return this.$store.state.downloads.filter(function (download) {
        return download.status === 'error'
      })
    },
    cancelledDownloads: function () {
      return this.$store.state.downloads.filter(function (download) {
        return download.status === 'cancelled'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.md-badge { margin-right: 4px; }
</style>
