<script lang="ts" setup>
const emits = defineEmits(['finish'])
const props = defineProps<{
    deadline: Date,
}>()

const dayjs = useDayjs();
const secondsLeft = ref(0)

const countdown = () => {
  secondsLeft.value = dayjs(props.deadline).diff(dayjs(), 'second');

  if (secondsLeft.value > 0) {
    setTimeout(countdown, 1000);
  } else {
    emits('finish');
  }
}

const formattedTime = computed(() => `${Math.floor(secondsLeft.value / 60)}:${Math.floor(secondsLeft.value % 60)}`)

watch(() => props.secondsLeft, () => {
  countdown();
}, {
  immediate: true,
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
      {{ formattedTime }}
    </div>
  </div>
</template>
