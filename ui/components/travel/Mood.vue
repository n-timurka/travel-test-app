<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
        validator: (v: number) => v > 0 && v < 100,
    },
    icon: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        validator: (v: string) => ['green', 'cyan', 'slate', 'violet', 'orange'].includes(v)
    }
})

const textClasses = {
    green: 'text-green-600',
    cyan: 'text-cyan-500',
    slate: 'text-slate-600',
    violet: 'text-violet-600',
    orange: 'tecxt-orange-600',
}
</script>

<template>
  <div class="flex space-x-2 items-center">
    <Icon
      :name="icon"
      :class="['text-4xl', textClasses[color]]"
    />
    <div class="leading-4">
      <p class="text-xs text-gray-600">
        {{ title }}
      </p>
      <p :class="['font-semibold', textClasses[color]]">
        {{ value }}
      </p>
    </div>
  </div>
</template>
