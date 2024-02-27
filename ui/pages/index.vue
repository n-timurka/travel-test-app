<script lang="ts" setup>
import { type TravelType } from "@/types"

const { $api } = useNuxtApp()

const { data: travels, pending } = await useAsyncData<TravelType[]>(() => $api('/travels'))
</script>

<template>
  <main class="container px-4 md:mx-auto my-4 self-start">
    <h1 class="text-2xl mb-4">
      Travels
    </h1>

    <section class="w-full grid gap-8 md:grid-cols-3">
      <div v-if="pending">
        Loading...
      </div>
      <template v-else>
        <TravelCard
          v-for="travel in travels"
          :key="travel.id"
          :travel="travel"
        />
      </template>
    </section>
  </main>
</template>
~/types