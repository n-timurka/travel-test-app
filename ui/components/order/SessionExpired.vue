<script lang="ts" setup>
import type { OrderType } from '~/types';

defineProps<{
  order: OrderType,
}>()
</script>

<template>
  <main class="bg-white p-8 shadow-xl rounded text-center">
    <h1 class="text-2xl mb-2">
      Your time is out
    </h1>
    <p class="mb-8">
      We are sorry, but your session expired.
    </p>
    <AppButton :to="{ name: 'checkout-slug', params: { slug: order.travel.slug } }">
      Retry booking
    </AppButton>
    <div>
      <NuxtLink
        to="/"
        class="text-sm text-slate-600"
      >
        Show travels
      </NuxtLink>
    </div>
  </main>
</template>
  