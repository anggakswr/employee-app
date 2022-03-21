<template>
  <nav class="w-52 border-2 border-yellow-500 p-4 flex flex-col gap-4 bg-white">
    <NuxtLink to="/">Employee</NuxtLink>
    <NuxtLink to="/profile">Profile</NuxtLink>
    <button class="text-left" @click="$auth.logout()">Logout</button>
  </nav>
</template>

<script>
export default {
  name: 'DefaultSidebar',
}
</script>

<style scoped>
a,
button {
  @apply p-2 border-2 border-yellow-500;
}

a:hover,
button:hover {
  @apply bg-yellow-500 text-white;
}
</style>
