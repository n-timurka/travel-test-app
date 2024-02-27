<script lang="ts" setup>
import { OrderPayment, OrderSessionExpired, OrderSuccess } from "#components";
import { OrderStatusEnum, type OrderType } from "@/types";
const { $api } = useNuxtApp()

const { id } = useRoute().params

const { data: order } = await useAsyncData<OrderType>(() => $api(`/orders/${id}`))
if (!order.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

const components = {
  [OrderStatusEnum.NEW]: OrderPayment,
  [OrderStatusEnum.FINISHED]: OrderSuccess,
  [OrderStatusEnum.EXPIRED]: OrderSessionExpired,
}
const component = computed(() => components[order.value.status])
</script>

<template>
  <component
    :is="component"
    :order="order"
  />
</template>
