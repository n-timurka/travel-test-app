<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
    error: NuxtError,
}>()

definePageMeta({
  layout: 'error'
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLoadingIndicator class="bg-rose-600" />
    
    <TheHeader />
    
    <main class="flex-1 bg-slate-50 flex items-center justify-center">
      <div class="bg-white p-8 shadow-lg rounded text-center">
        <h1 class="text-6xl font-semibold mb-2">
          {{ error.statusCode }}
        </h1>
        <p class="mb-8">
          {{ error.message }}
        </p>
        <NuxtLink
          to="/"
          class="text-gray-600 text-sm underline"
        >
          Go back home
        </NuxtLink>
      </div>
    </main>
    
    <TheFooter />
  </div>
</template>
