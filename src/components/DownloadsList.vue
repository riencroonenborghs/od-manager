<template>
  <div>
    <md-empty-state v-if="downloads.length == 0"
      class="md-primary"
      :md-icon="icon"
      :md-label="emptyStateFullLabel"
      :md-description="emptyStateDescription">
    </md-empty-state>
    <md-list v-if="downloads.length > 0">
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
            </flex-col>
            <div>
              <md-button class="md-icon-button md-accent">
                <md-icon>delete_outline</md-icon>
              </md-button>
              <md-button class="md-icon-button md-primary">
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
    }
  },
  filters: {
    date: function (value) {
      return DayJS(value).format('dddd D MMMM YYYY [at] HH:mm:s')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
