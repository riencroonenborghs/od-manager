<template>
  <div id="auth">
    <form>
      <flex-col noWrap align-v="center" id="url">
        <md-field>
          <md-icon>email</md-icon>
          <label>E-mail</label>
          <md-input type="email" required v-model="email"></md-input>
        </md-field>
        <md-field>
          <md-icon>vpn_key</md-icon>
          <label>Password</label>
          <md-input type="password" required v-model="password"></md-input>
        </md-field>
        <flex-row align-h="end">
          <md-button v-on:click="reset" class="md-flat">Reset</md-button>
          <md-button v-on:click="logIn" class="md-primary" :disabled="!email || !password">Log In</md-button>
        </flex-row>
      </flex-col>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data: () => ({
    email: null,
    password: null
  }),
  methods: {
    reset: function () {
      this.email = null
      this.password = null
    },
    logIn: function () {
      this.$store.state.authService.logIn(this.email, this.password).then(
        (success) => {
          this.$store.dispatch('successMessage', 'welcome back')
          this.$router.push({ path: '/' })
        }
      )
    }
  }
}
</script>

<style lang="scss">
#auth { padding: 8px; width: 500px; }
</style>
