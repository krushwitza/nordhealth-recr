<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

const { handleSubmit, defineField, errors} = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email('Invalid email format').required('Email is required'),
      password: string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
      name: string(),
    }),
  ),
});
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const showPassword = ref<Boolean>(false);
const isLoading = ref(false);
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const result = await $fetch('/api/wait')
  isLoading.value = false;
  if (result) {
    navigateTo('/success')
  }
})
</script>

<template>
  <main>
    <nord-card padding="l" class="card">
        <h2 slot="header">Sign up for updates</h2>
        <form @submit.prevent="onSubmit">
          <nord-stack>
            <!-- email -->
            <nord-input
              label="Email"
              type="email"
              name="email"
              v-bind="emailAttrs"
              v-model="email"
              aria-describedby="email-error"
              :aria-invalid="!!errors.email"
              :expand="true"
              required
            >
              <span
                slot="error"
                v-if="errors.email"
                id="email-error"
                role="alert"
                aria-live="polite"
              >
                {{ errors.email }}
              </span>
            </nord-input>
          
            <!-- pass -->
            <nord-input
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              v-bind="passwordAttrs"
              v-model="password"
              aria-describedby="password-error"
              :aria-invalid="!!errors.password"
              required
              :expand="true"
            >
              <nord-button
                slot="end"
                type="button"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <nord-icon v-if="showPassword" size="s" name="interface-edit-off"></nord-icon>
                <nord-icon v-else size="s" name="interface-edit-on"></nord-icon>
              </nord-button>

              <span
                v-if="errors.password"
                slot="error"
                id="password-error"
                role="alert"
                aria-live="polite"
              >
                {{ errors.password }}
              </span>
            </nord-input>

            <!-- checkbox -->
            <nord-checkbox
              label="Receive occasional product updates and announcements"
              value="Value"
            ></nord-checkbox>

            <!-- submit -->
            <nord-button
              type="submit"
              variant="primary"
              expand
              :loading="isLoading"
            >
              Submit
            </nord-button>
          </nord-stack>
        </form>
    </nord-card>
  </main>
</template>
