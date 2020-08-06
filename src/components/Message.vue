<template>
  <div>
    <md-snackbar :class="type" md-position="left" :md-active.sync="show" md-persistent>
      <span>{{message}}</span>
      <md-button class="md-icon-button" :class="type" @click="show = false">
        <md-icon>close</md-icon>
      </md-button>
    </md-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Message',
  data: () => ({
    show: false
  }),
  computed: mapState({
    message: function (state) {
      if (state.message.message) { this.show = true }
      return state.message.message
    },
    type: function (state) {
      return state.message.type
    }
  })
}
</script>

<style scoped lang="scss">
.md-snackbar.success { background: #b1efae; }
.md-snackbar.success .md-button .md-icon { color: #208c42; }
.md-snackbar.error { background: #efaeae; }
.md-snackbar.error .md-button .md-icon { color: #8c2020; }
</style>
