<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string,
  label?: string,
}>();

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <div class="relative pb-4">
    <label
      v-if="label"
      :for="name"
      :class="['text-sm', errorMessage ? 'text-red-600' : 'text-gray-400']"
    >{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="name"
      v-model="value"
      :name="name"
      :class="[
        'w-full py-2 px-4 h-10 rounded border focus:outline-none focus:shadow bg-white text-sm',
        errorMessage ? 'border-red-400' : 'border-inherit',
      ]"
    >
    <p
      v-if="errorMessage"
      class="absolute bottom-0 text-xs text-red-400"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
