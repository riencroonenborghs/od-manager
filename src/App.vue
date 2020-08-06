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
          <md-button v-if="authenticated" class="md-icon-button" @click="reload()" title="Reload downloads">
            <md-icon>autorenew</md-icon>
          </md-button>
          <md-button v-if="authenticated" class="md-icon-button" @click="logOut()" title="Log out">
            <md-icon>lock_open</md-icon>
          </md-button>
        </div>
      </flex-row>
    </md-toolbar>

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
    }
  }),
  methods: {
    logOut: function () {
      if (!this.$store.state.authService.authenticated) return
      this.$store.state.authService.logOut()
      this.$router.push({ name: 'auth' })
    },
    reload: function () {
      this.$store.dispatch('successMessage', 'you\'re in')
      this.$store.dispatch('loadDownloads')
    }
  }
}
</script>

<style lang="scss">
.md-toolbar #title {
  width: 100%;
}
</style>
