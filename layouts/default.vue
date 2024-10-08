<script setup lang="ts">
const route = useRoute()

useHead({
  title: `Nordhealth - ${route.meta.title}`,
  meta: [
    { name: 'description', content: route.meta.description as string },
  ],
})
</script>

<template>
  <div>
    <nord-header>
      <h1 class="n-typescale-l">Nordhealth</h1>
    </nord-header>
    <slot />
  </div>
</template>

<style scoped>

</style>
