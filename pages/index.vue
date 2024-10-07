<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

const { values, handleSubmit, defineField, errors} = useForm({
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
      <div>
        <label for="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          v-bind="emailAttrs"
          v-model="email"
          aria-describedby="email-error"
          :aria-invalid="!!errors.email"
        >
        <span
          v-if="errors.email"
          id="email-error"
          role="alert"
          aria-live="polite"
        >
          {{ errors.email }}
        </span>
      </div>
      
      <div>
        <label for="password">
          Password:
        </label>

        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          name="password"
          v-bind="passwordAttrs"
          v-model="password"
          aria-describedby="password-error"
          :aria-invalid="!!errors.password"
        >
        <span
          v-if="errors.password"
          id="password-error"
          role="alert"
          aria-live="polite"
        >
          {{ errors.password }}
        </span>
      </div>
      <button
        type="button"
        @click="showPassword = !showPassword"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
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
