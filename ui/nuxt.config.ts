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
    serverApiUrl: process.env.API_SERVER_URL,

    public: {
      apiUrl: process.env.API_CLIENT_URL,
    },
  },
});
