<script setup lang="ts">
import { ref } from 'vue';

const showPassword = ref(false);
</script>

<template>
  <div>
    <form action="">
      <label for="email">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
      >
      
      <label for="password">
        Password:
      </label>

      <input
        :type="showPassword ? 'text' : 'password'"
        id="password"
        name="password"
        required
      >
      <button
        type="button"
        @click="showPassword = !showPassword"
      >
        {{ showPassword ? '🙈' : '👁️' }}
      </button>

      <button type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<style scoped></style>
