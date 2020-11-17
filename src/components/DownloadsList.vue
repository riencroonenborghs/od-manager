<template>
  <div>
    <md-empty-state v-if="downloads.length == 0"
      class="md-primary"
      :md-icon="icon"
      :md-label="emptyStateFullLabel"
      :md-description="emptyStateDescription">
    </md-empty-state>
    <md-list v-if="downloads.length > 0" class="download-list">
      <md-list-item md-expand v-for="download in downloads" :key="download.id">
        <md-icon>{{icon}}</md-icon>
        <span class="md-list-item-text">{{download.url}}</span>

        <md-list slot="md-expand">
          <flex-row align-h="between">
            <flex-col>
              <md-list-item class="md-inset">
                Added by {{download.user.email}}
              </md-list-item>
              <md-list-item class="md-inset" v-if="download.queuedAt">
                Queued on {{download.queuedAt | date}}
              </md-list-item>
              <md-list-item class="md-inset" v-if="download.startedAt">
                Started on {{download.startedAt | date}}
              </md-list-item>
              <md-list-item class="md-inset" v-if="download.finishedAt">
                Finished on {{download.finishedAt | date}}
              </md-list-item>
              <md-list-item class="md-inset" v-if="download.cancelledAt">
                Cancelled on {{download.cancelledAt | date}}
              </md-list-item>
              <md-list-item class="md-inset" v-if="errorType">
                <div class="error">{{download.error}}</div>
              </md-list-item>
            </flex-col>
            <div>
              <md-button v-if="!startedType" class="md-icon-button md-accent" @click="remove(download)" title="Remove download">
                <md-icon>delete_outline</md-icon>
              </md-button>
              <md-button v-if="queuedType" class="md-icon-button md-primary" @click="cancel(download)" title="Cancel download">
                <md-icon>close</md-icon>
              </md-button>
              <md-button v-if="finishedType || errorType || cancelledType" class="md-icon-button md-primary" @click="queue(download)" title="Queue download again">
                <md-icon>add_to_queue</md-icon>
              </md-button>
            </div>
          </flex-row>
        </md-list>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import * as DayJS from 'dayjs'

export default {
  name: 'DownloadsList',
  props: ['downloads', 'type', 'icon'],
  computed: {
    emptyStateFullLabel: function () {
      return `Nothing in ${this.type}`
    },
    emptyStateDescription: function () {
      return `All your ${this.type} downloads will appear here.`
    },
    queuedType: function () { return this.type === 'queued' },
    startedType: function () { return this.type === 'started' },
    finishedType: function () { return this.type === 'finished' },
    errorType: function () { return this.type === 'error' },
    cancelledType: function () { return this.type === 'cancelled' }
  },
  filters: {
    date: function (value) {
      return DayJS(value).format('dddd D MMMM YYYY [at] HH:mm:s')
    }
  },
  methods: {
    remove: function (download) {
      this.$store.state.downloadsService.remove(download).then(
        (data) => {
          this.$store.dispatch('successMessage', 'download removed')
          this.$store.dispatch('loadDownloads')
        }
      )
    },
    queue: function (download) {
      this.$store.state.downloadsService.queue(download).then(
        (data) => {
          this.$store.dispatch('successMessage', 'download queued')
          this.$store.dispatch('loadDownloads')
        }
      )
    },
    cancel: function (download) {
      this.$store.state.downloadsService.cancel(download).then(
        (data) => {
          this.$store.dispatch('successMessage', 'download cancelled')
          this.$store.dispatch('loadDownloads')
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.error { background: #efaeae; color: #8c2020; padding: 8px 16px; }
// 64 = toolbar, 48 tabs, 16 padding
.md-list.download-list {
  height: calc(100vh - 64px - 48px - 16px);
  overflow: auto;
}
</style>
