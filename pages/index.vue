<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

const { values, handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().required(),
      password: string().required(),
      name: string(),
    }),
  ),
});
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const showPassword = ref<Boolean>(false);
const onSubmit = handleSubmit(async (values) => {
  navigateTo('/success')
})
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="email">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        v-bind="emailAttrs"
        v-model="email"
      >
      
      <label for="password">
        Password:
      </label>

      <input
        :type="showPassword ? 'text' : 'password'"
        id="password"
        name="password"
        required
        v-bind="passwordAttrs"
        v-model="password"
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
