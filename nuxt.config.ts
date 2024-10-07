// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@vee-validate/nuxt',
  ],
  plugins: [
    {
      src: '~/plugins/nordcomponents.ts',
      mode: 'client'
    }
  ],
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }
  }
})
