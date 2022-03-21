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
        </div>
      </div>

      <form v-if="user" class="p-4" @submit.prevent="submit">
        <input
          v-model="firstName"
          type="text"
          placeholder="First Name"
          :disabled="loading"
          :class="{
            'border-red-500': firstNameError,
            'border-gray-300': !firstNameError,
          }"
        />

        <p v-if="firstNameError" class="text-red-500 text-xs mb-2">
          {{ firstNameError }}
        </p>

        <input
          v-model="lastName"
          type="text"
          placeholder="Last Name"
          :disabled="loading"
          :class="{
            'border-red-500': lastNameError,
            'border-gray-300': !lastNameError,
          }"
        />

        <p v-if="lastNameError" class="text-red-500 text-xs mb-2">
          {{ lastNameError }}
        </p>

        <input
          v-model="email"
          type="text"
          placeholder="Email"
          :disabled="loading"
          :class="{
            'border-red-500': emailError,
            'border-gray-300': !emailError,
          }"
        />

        <p v-if="emailError" class="text-red-500 text-xs mb-2">
          {{ emailError }}
        </p>

        <button
          class="border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white py-2 px-8"
          :disabled="loading"
        >
          Submit
        </button>
      </form>

      <p v-else>No data</p>
    </template>
  </main>
</template>

<script>
export default {
  name: 'EditUser',
  data() {
    return {
      loading: false,
      user: null,
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      email: '',
      emailError: '',
    }
  },
  fetch() {
    this.getUser()
  },
  head() {
    return {
      title: 'Profile',
    }
  },
  methods: {
    async getUser() {
      this.loading = true

      try {
        const res = await this.$axios.get('/users/4')
        const data = res.data.data

        this.user = data
        this.firstName = data.first_name
        this.lastName = data.last_name
        this.email = data.email
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
    async submit() {
      const requiredFields = ['firstName', 'lastName', 'email']
      const fieldsFilled = requiredFields.every((field) => this[field])

      requiredFields.forEach((field) => {
        this[field + 'Error'] = ''
      })

      this.loading = true

      if (!fieldsFilled) {
        requiredFields.forEach((field) => {
          if (!this[field]) {
            this[field + 'Error'] = 'Field is required'
          }
        })
      } else {
        try {
          const { firstName, lastName, email } = this

          const payload = {
            first_name: firstName,
            last_name: lastName,
            email,
          }

          await this.$axios.put('/users/4', payload)
          this.$store.commit('setSnackbarMsg', {
            type: 'success',
            msg: 'Data edited',
          })
        } catch (err) {
          let errSnack = 'Maaf, terjadi kesalahan'

          if (err.response && err.response.data) {
            errSnack = err.response.data.message || err.response.data.error
          } else {
            errSnack = err.message || 'Maaf, terjadi kesalahan'
          }

          this.$store.commit('setSnackbarMsg', { type: 'error', msg: errSnack })
        }
      }

      this.loading = false
    },
  },
}
</script>

<style scoped>
input {
  @apply border  p-2 block mb-2;
}
</style>
