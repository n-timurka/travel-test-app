import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiUrl || "http://localhost:3001",
    });

    return {
      provide: {
        api,
      },
    };
  },
});
