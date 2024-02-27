
import type travels from '~/server/api/travels';
<script lang="ts" setup>
import { type TravelType } from '@/types'

const props = defineProps<{
    travel: TravelType,
}>()

const { startingDate, endingDate, daysBetween, price } = useTravel(props.travel)
</script>

<template>
  <article class="flex flex-col bg-white shadow-md rounded-lg p-4 hover:shadow-lg">
    <h3 class="font-semibold text-xl mb-2">
      {{ travel.name }}
    </h3>

    <div class="flex space-x-2 justify-between mb-3">
      <div class="flex items-center space-x-1">
        <Icon
          name="solar:calendar-linear"
          class="text-rose-600 text-xl"
        />
        <span class="text-gray-600">From <strong>{{ startingDate }}</strong>, to <strong>{{ endingDate }}</strong></span>
      </div>
      <div class="flex items-center space-x-1">
        <Icon
          name="tabler:sun-moon"
          class="text-rose-600 text-xl"
        />
        <span class="text-gray-600">Days: {{ daysBetween }}</span>
      </div>
    </div>

    <div class="flex-1 text-sm mb-4">
      {{ travel.description }}
    </div>

    <div class="flex justify-between mb-6">
      <TravelMood
        title="Nature"
        :value="travel.moods.nature"
        icon="material-symbols:nature-people-outline"
        color="green"
      />
      <TravelMood
        title="Relax"
        :value="travel.moods.relax"
        icon="material-symbols:relax-outline"
        color="cyan"
      />
      <TravelMood
        title="History"
        :value="travel.moods.history"
        icon="material-symbols:church-outline"
        color="slate"
      />
      <TravelMood
        title="Culture"
        :value="travel.moods.culture"
        icon="solar:city-linear"
        color="violet"
      />
      <TravelMood
        title="Relax"
        :value="travel.moods.relax"
        icon="mdi:party-popper"
        color="orange"
      />
    </div>

    <div class="flex justify-between items-center">
      <div class="text-xl font-semibold">
        {{ price }}
      </div>
      <AppButton
        v-if="travel.seats > travel.booked"
        :to="{ name: 'checkout-slug', params: { slug: travel.slug } }"
      >
        Book
      </AppButton>
      <div
        v-else
        class="text-red-600 text-sm"
      >
        Fully Booked
      </div>
    </div>
  </article>
</template>
