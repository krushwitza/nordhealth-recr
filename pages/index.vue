<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { formSchema } from '@/utils/validation.schema';

// UI state
const isLoading = ref(false);
const showPassword = ref<boolean>(false);

// Form
const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema
});

// Form fields
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

// Form submission handler
const onSubmit = handleSubmit(async () => {
  isLoading.value = true;
  const result = await $fetch('/api/wait');
  isLoading.value = false;
  if (result) {
    navigateTo('/success');
  }
});
</script>

<template>
  <main>
    <nord-card padding="l" class="card">
        <h2 slot="header">Sign up for updates</h2>
        <form @submit.prevent="onSubmit">
          <nord-stack>
            <!-- email -->
            <nord-input
              v-model="email"
              label="Email"
              type="email"
              name="email"
              v-bind="emailAttrs"
              aria-describedby="email-error"
              :aria-invalid="!!errors.email"
              :expand="true"
              required
            >
              <span
                v-if="errors.email"
                id="email-error"
                slot="error"
                role="alert"
                aria-live="polite"
              >
                {{ errors.email }}
              </span>
            </nord-input>
          
            <!-- pass -->
            <nord-input
              id="password"
              v-model="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              v-bind="passwordAttrs"
              aria-describedby="password-error"
              :aria-invalid="!!errors.password"
              required
              :expand="true"
            >
              <nord-button
                slot="end"
                type="button"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <nord-icon v-if="showPassword" size="s" name="interface-edit-off"/>
                <nord-icon v-else size="s" name="interface-edit-on"/>
              </nord-button>

              <span
                v-if="errors.password"
                id="password-error"
                slot="error"
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
            />

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
