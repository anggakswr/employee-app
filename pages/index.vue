<template>
  <main class="flex-1 border-2 border-yellow-500 p-4 bg-white">
    <p v-if="loading">Loading ...</p>

    <template v-else>
      <NuxtLink
        v-for="user in users"
        :key="'user-' + user.id"
        class="mb-4 flex gap-4 border border-gray-300 hover:bg-gray-300"
        :to="'/user/' + user.id"
      >
        <img :src="user.avatar" :alt="user.first_name" />

        <div class="p-4">
          <p>
            <b> {{ user.first_name }} </b>
          </p>

          <p>{{ user.email }}</p>
        </div>
      </NuxtLink>

      <p v-if="!users.length">No data</p>
    </template>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      loading: false,
      users: [],
    }
  },
  fetch() {
    this.getUsers()
  },
  head() {
    return {
      title: 'Employee',
    }
  },
  methods: {
    async getUsers() {
      this.loading = true

      try {
        const res = await this.$axios.get('/users')
        // console.log('getUsers', res.data)
        const { data } = res.data
        this.users = data
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
