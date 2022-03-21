<template>
  <div
    class="fixed z-10 inset-x-0 box-center duration-300 transform"
    :class="
      snackbarMsg ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-20'
    "
  >
    <div
      v-if="snackbarMsg"
      class="py-2 px-4 box-between"
      :class="{
        'bg-green-400': snackbarMsg.type === 'success',
        'text-white bg-red-500': snackbarMsg.type === 'error',
      }"
    >
      <p class="text-sm">{{ snackbarMsg.msg }}</p>

      <button
        class="text-lg ml-8"
        @click="$store.commit('setSnackbarMsg', null)"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SnackbarMsg',
  computed: {
    snackbarMsg() {
      return this.$store.state.snackbarMsg
    },
  },
  watch: {
    snackbarMsg(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$store.commit('setSnackbarMsg', null)
        }, 5000)
      }
    },
  },
}
</script>
