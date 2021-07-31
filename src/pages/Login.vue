<template>
  <v-container>
    <v-form
        ref="form"
        lazy-validation>
      <v-text-field
          v-model="name"
          label="Name"
          required
      ></v-text-field>
      <v-text-field
          type="password"
          v-model="password"
          :error="failed"
          label="Password"
          required
      ></v-text-field>
      <v-btn
          color="success"
          class="mr-4"
          @click="login">
        Login
      </v-btn>
    </v-form>
  </v-container>
</template>

<style lang="scss">
</style>
<script>
export default {
  name: 'User',
  data: () => ({
    name: '',
    password: '',
    failed: false
  }),
  components: {},
  methods: {
    login() {
      fetch('/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.name,
          password: this.password
        })
      }).then(res => {
        if (res.ok) {
          this.$cookies.set('logged_in', true)
          this.$cookies.set('username', this.name)
          this.$router.push("/")
        } else this.failed = true;
      })
    }
  }
}
</script>