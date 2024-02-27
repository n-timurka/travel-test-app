<script lang="ts" setup>
import type { TravelType } from '~/types';

const props = defineProps({
  travel: {
    type: Object as PropType<TravelType>,
    required: true,
  },
  seats: {
    type: Number,
    default: 0,
  }
})

const { daysBetween, startingDate, endingDate } = useTravel(props.travel)
</script>

<template>
  <div class="border rounded p-4 flex flex-col divide-y">
    <div class="text-center mb-4">
      <h3 class="text-xl font-semibold mb-2">
        {{ travel.name }}
      </h3>
      <div class="flex space-x-4 justify-evenly items-center mb-3">
        <div class="flex items-center space-x-1">
          <Icon
            name="solar:calendar-linear"
            class="text-rose-600 text-xl"
          />
          <span class="text-xs text-gray-600">
            From <strong>{{ startingDate }}</strong> to <strong>{{ endingDate }}</strong>
          </span>
        </div>
        <div class="flex items-center space-x-1">
          <Icon
            name="tabler:sun-moon"
            class="text-rose-600 text-xl"
          />
          <span class="text-xs text-gray-600">Days: {{ daysBetween }}</span>
        </div>
      </div>
      <div class="text-sm">
        {{ travel.description }}
      </div>
    </div>
    <div class="pt-2 flex justify-between font-semibold">
      <div>Total:</div>
      <div>&euro;{{ seats * travel.price }}</div>
    </div>
  </div>
</template>
