<script setup lang="ts">
import { cn } from '@/utils/cn'
import { NuxtLink } from "#components";

const variantClasses: Record<string, string> = {
  primary: 'bg-rose-600 text-rose-50 border hover:bg-rose-600/80',
  secondary: 'bg-white text-rose-600 border border-rose-600 hover:bg-rose-100',
}

const props = defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string): boolean =>['primary', 'secondary'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: (v: string): boolean => ['button', 'submit', 'reset'].includes(v),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const btnClasses = computed(() => cn(
    'rounded inline-flex space-x-1 items-center justify-center transition-colors px-4 py-2 text-sm h-10',
    variantClasses[props.variant],
    props.disabled ? 'opacity-20' : 'cursor-pointer',
))
const component = computed(() => props.to ? NuxtLink : 'button')
</script>

<template>
  <component
    :is="component"
    :type="type"
    :to="to"
    :disabled="disabled"
    :class="btnClasses"
  >
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5 absolute"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <span
      v-if="$slots['default']"
      :class="[loading && 'invisible']"
    >
      <slot />
    </span>
  </component>
</template>
