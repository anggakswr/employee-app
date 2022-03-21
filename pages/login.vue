<template>
  <form
    class="border-2 border-yellow-500 p-8 bg-white flex flex-col gap-4"
    @submit.prevent="submit"
  >
    <input
      v-model="email"
      type="text"
      placeholder="Email"
      :disabled="loading"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
      :disabled="loading"
    />

    <button
      class="border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white p-2"
      :disabled="loading || !email || !password"
    >
      Login
    </button>
  </form>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'login',
  middleware: (context) => {
    if (context.$auth.$state.loggedIn) {
      context.redirect('/')
    }
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    }
  },
  head() {
    return {
      title: 'Login',
    }
  },
  methods: {
    async submit() {
      this.loading = true

      try {
        const { email, password } = this
        const payload = { email, password }

        const res = await this.$auth.loginWith('local', {
          data: payload,
        })

        const data = res.data
        const token = data.token

        this.$auth.strategy.token.set(token)
        this.$auth.setUser(data)
        this.$auth.$storage.setLocalStorage('user', data)

        this.$router.push('/')
      } catch (err) {
        let errSnack = 'Maaf, terjadi kesalahan'

        if (err.response && err.response.data) {
          errSnack = err.response.data.message || err.response.data.error
        } else {
          errSnack = err.message || 'Maaf, terjadi kesalahan'
        }

        this.$store.commit('setSnackbarMsg', { type: 'error', msg: errSnack })
      }

      this.loading = false
    },
  },
}
</script>

<style scoped>
input {
  @apply border border-gray-300 p-2;
}
</style>
