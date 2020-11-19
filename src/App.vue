<template>
  <div id="app">
    <md-toolbar>
      <flex-row align-h="between" align-v="center" id="title">
        <flex-row align-v="center">
          <md-button class="md-icon-button" @click="showSettings = true" title="Settings">
            <md-icon>more_vert</md-icon>
          </md-button>
          <h3 class="md-title">OD Manager</h3>
        </flex-row>
        <div>
          <md-icon v-if="!authenticated">lock</md-icon>
          <div v-if="authenticated">
            <md-button class="md-icon-button" to="/downloads/new" exact-active-class="active-view" title="Add new download">
              <md-icon>add</md-icon>
            </md-button>
            <md-button class="md-icon-button" to="/downloads" title="Back to downloads">
              <md-icon>list</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="reload()" title="Reload downloads">
              <md-icon>autorenew</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="logOut()" title="Log out">
              <md-icon>lock_open</md-icon>
            </md-button>
          </div>
        </div>
      </flex-row>
    </md-toolbar>

    <md-progress-bar md-mode="query" v-if="fetchingDownloads"></md-progress-bar>

    <router-view></router-view>

    <Message></Message>
    <SettingsDialog :show="showSettings" v-on:closeDialog="showSettings = false"></SettingsDialog>
  </div>
</template>

<script>
import Message from '@/components/Message'
import SettingsDialog from '@/components/SettingsDialog'
import { mapState } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    showSettings: false
  }),
  components: {
    Message, SettingsDialog
  },
  computed: mapState({
    authenticated: function (state) {
      return state.authenticated
    },
    fetchingDownloads: function (state) {
      return state.fetchingDownloads
    }
  }),
  methods: {
    logOut: function () {
      if (!this.$store.state.authService.authenticated) return
      this.$store.state.authService.logOut()
      this.$router.push({ name: 'auth' })
    },
    reload: function () {
      this.$store.dispatch('successMessage', 'reloading list ...')
      this.$store.dispatch('loadDownloads')
    },
    add: function () {
      this.$router.push({ name: 'new-download' })
    },
    downloads: function () {
      this.$router.push({ name: 'downloads' })
    }
  }
}
</script>

<style lang="scss">
html {
  background: var(--md-theme-default-background, #424242);
}
// extension size
body {
  width: 800px;
  height: 600px;
  background: var(--md-theme-default-background, #424242);
}
.md-toolbar #title {
  width: 100%;
}
.active-view {
  display: none;
}
</style>
