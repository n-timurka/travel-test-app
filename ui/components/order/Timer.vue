<script lang="ts" setup>
const emits = defineEmits(['finish'])
const props = defineProps<{
    seconds: number,
}>()

const interval = ref()
const seconds = ref(props.seconds)
const time = computed(() => {
    const min = `0${Math.floor(seconds.value / 60)}`.slice(0, 2);
    const sec = `0${seconds.value % 60}`.slice(0, 2);

    return `${min}:${sec}`;
})

onMounted(() => {
   interval.value = setInterval(function() {
    if (seconds.value <= 0) {
        clearInterval(interval.value);
        emits('finish');
    }

    seconds.value--;
}, 1000);
})

onUnmounted(() => {
    clearInterval(interval.value);
});
</script>

<template>
  <div class="p-4 bg-slate-100 rounded text-center">
    <div class="flex items-center justify-center space-x-1 text-sm">
      <Icon
        name="mdi:clock-outline"
        class="text-lg"
      />
      <span>You have to complete your booking</span>
    </div>
    <div class="text-red-600 font-semibold">
      {{ time }}
    </div>
  </div>
</template>
