<template>
  <md-dialog :md-active.sync="show" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <md-dialog-title>
      <flex-row align-h="between" align-v="center">
        <span>Settings</span>
        <md-button class="md-icon-button" @click="close()">
          <md-icon>close</md-icon>
        </md-button>
      </flex-row>
    </md-dialog-title>

    <form novalidate>
      <flex-row>
        <div id="protocol">
          <md-field>
            <label for="protocol">Protocol</label>
            <md-select v-model="protocol" name="protocol">
              <md-option value="http">http://</md-option>
              <md-option value="https">https://</md-option>
            </md-select>
          </md-field>
        </div>

        <div id="hostname">
          <md-field>
            <label for="hostname">Hostname</label>
            <md-input v-model="hostname" name="hostname"></md-input>
          </md-field>
        </div>

        <div id="port">
          <md-field>
            <label for="port">Port</label>
            <md-input v-model="port" type="number" name="port"></md-input>
          </md-field>
        </div>
      </flex-row>
    </form>

    <md-dialog-actions>
      <md-button @click="close()">Close</md-button>
      <md-button class="md-primary" @click="save()">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'SettingsDialog',
  props: ['show'],
  methods: {
    close: function () {
      this.$emit('closeDialog')
    },
    save: function () {
      this.$store.dispatch('saveSettings')
      this.close()
    }
  },
  computed: {
    protocol: {
      get () {
        return this.$store.state.settings.protocol
      },
      set (value) {
        this.$store.state.settings.protocol = value
      }
    },
    hostname: {
      get () {
        return this.$store.state.settings.hostname
      },
      set (value) {
        this.$store.state.settings.hostname = value
      }
    },
    port: {
      get () {
        return this.$store.state.settings.port
      },
      set (value) {
        this.$store.state.settings.port = value
      }
    }
  }
}
</script>

<style scoped lang="scss">
form { padding: 16px; }
#protocol { width: 100px; }
#port input { width: 60px; }
#hostname { width: 250px; }
#protocol, #hostname { padding-right: 4px; }
</style>
