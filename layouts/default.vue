<template>
  <div class="p-8 flex min-h-screen gap-x-8 bg-gray-300">
    <Snackbar />
    <Sidebar />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'auth',
}
</script>
