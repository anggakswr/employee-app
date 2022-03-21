<template>
  <main class="flex-1 border-2 border-yellow-500 p-4 bg-white">
    <p v-if="loading">Loading ...</p>

    <template v-else>
      <div v-if="user" class="mb-4 flex gap-4 border border-gray-300">
        <img :src="user.avatar" :alt="user.first_name" />

        <div class="p-4">
          <p>
            <b> {{ user.first_name }} {{ user.last_name }} </b>
          </p>

          <p>{{ user.email }}</p>

          <NuxtLink
            v-if="user.first_name === 'Eve'"
            to="/profile"
            class="text-yellow-500"
          >
            Edit
          </NuxtLink>
        </div>
      </div>

      <p v-else>No data</p>
    </template>
  </main>
</template>

<script>
export default {
  name: 'DetailUser',
  data() {
    return {
      loading: false,
      user: null,
    }
  },
  fetch() {
    this.getUser()
  },
  head() {
    return {
      title: this.user
        ? this.user.first_name + ' ' + this.user.last_name
        : 'User Detail',
    }
  },
  methods: {
    async getUser() {
      this.loading = true

      try {
        const res = await this.$axios.get('/users/' + this.$route.params.id)
        this.user = res.data.data
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
