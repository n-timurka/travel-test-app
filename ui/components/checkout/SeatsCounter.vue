<script lang="ts" setup>
import { useField } from 'vee-validate';

const { value, setValue } = useField<number>('seats');
setValue(0);

defineProps({
  max: {
    type: Number,
    default: 5,
  }
})
</script>

<template>
  <div>
    <label
      class="text-gray-400 text-sm"
      form="seats-amount"
    >
      Number of seats:
    </label>
    <div class="flex space-x-4 items-center">
      <AppButton
        :disabled="value < 1"
        type="button"
        @click="setValue(value - 1)"
      >
        -
      </AppButton>
      <input
        id="seats-amount"
        v-model="value"
        name="seats"
        class="py-2 px-3 h-10 w-12"
        type="number"
        disabled
      >
      <AppButton
        :disabled="value >= max"
        type="button"
        @click="setValue(value + 1)"
      >
        +
      </AppButton>
      <p class="text-sm">
        Available seats: {{ max }}
      </p>
    </div>
  </div>
</template>
