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
    <nord-header>
      <h1 class="n-typescale-l">Nord / Vue Example</h1>
    </nord-header>
    <main class="">
      <nord-card class>
        <form @submit.prevent="onSubmit">
          <nord-stack>
            <!-- email -->
            <nord-input
              label="Email"
              type="email"
              id="email"
              name="email"
              v-bind="emailAttrs"
              v-model="email"
              aria-describedby="email-error"
              :aria-invalid="!!errors.email"
            >
              <span
                slot="error"
                v-if="errors.password"
                id="password-error"
                role="alert"
                aria-live="polite"
              >
                {{ errors.password }}
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
            <nord-button type="submit" variant="primary">
              Submit
            </nord-button>
          </nord-stack>
        </form>
      </nord-card>
    </main>
  </div>
</template>

<style scoped>

</style>
