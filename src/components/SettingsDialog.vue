<template>
  <md-dialog :md-active.sync="show">
    <md-dialog-title>
      Settings
    </md-dialog-title>

    <form novalidate>
      <md-field>
        <label>Protocol</label>
        <md-select v-model="protocol">
          <md-option value="http">HTTP</md-option>
          <md-option value="https">HTTPS</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label>Hostname</label>
        <md-input v-model="hostname"></md-input>
      </md-field>

      <md-field>
        <label>Port</label>
        <md-input v-model="port" type="number"></md-input>
      </md-field>
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
</style>
