// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/eslint-module",
    "nuxt-icon",
    "dayjs-nuxt",
    "@vee-validate/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_BASE_URL,
    },
  },
});
