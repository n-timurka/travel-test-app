import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiUrl || "http://localhost/",
    });

    return {
      provide: {
        api,
      },
    };
  },
});
