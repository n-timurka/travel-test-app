<script lang="ts" setup>
import { OrderStatusEnum, type OrderType } from '~/types';
import { object, string } from 'yup';

const { $api } = useNuxtApp();

const props = defineProps<{
  order: OrderType,
}>();

const dayjs = useDayjs();
const secondsLeft = computed(() => {
  const final = dayjs(props.order.createdAt).utc().add(15, 'minute');

  return final.diff(dayjs().utc(), "second")
})

const { meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: object({
    cardNumber: string().required().matches(/^[0-9]+$/, 'Please, input only numbers').min(16).max(16),
    validUntil: string().required().matches(/^(0[1-9]|1[0-2])\/(0[0-9]|1[0-9]|2[0-9]|3[0-9])$/, 'Please, input date in right format mm/yy'),
    cardholder: string().required(),
    cvv: string().required().matches(/^[0-9]+$/, 'Please, input only numbers').min(3).max(3),
  }),
});

const onSubmit = handleSubmit(async () => {
  await useAsyncData<OrderType>(() => $api(`/orders/${props.order.id}`, {
      method: 'PATCH',
      body: {
        status: OrderStatusEnum.FINISHED,
      }
    }))

    reloadNuxtApp();
});

const stop = async () => {
  await useAsyncData<OrderType>(() => $api(`/orders/${props.order.id}`, {
      method: 'PATCH',
      body: {
        status: OrderStatusEnum.EXPIRED,
      }
    }))

    reloadNuxtApp();
}
</script>

<template>
  <main class="md:w-[72rem] md:mx-auto my-8 bg-white p-8 rounded shadow-md self-start">
    <h1 class="text-2xl font-semibold mb-4">
      Payment
    </h1>

    <div class="flex flex-col md:flex-row md:space-x-8">
      <div class="flex-1">
        <div class="rounded bg-slate-100 text-slate-600 text-sm p-4 mb-4">
          <p>This is the fake payment step. You have 15 minutes to complete payment until the order goes to declined.</p>
          <p>Input the card details. Please, <strong>don't use</strong> the real ones, cause it'll be stolen, haha :)</p>
        </div>
        <form
          class="flex flex-col"
          @submit.prevent="onSubmit"
        >
          <AppInput
            label="Card number"
            name="cardNumber"
          />
          <div class="flex space-x-4">
            <AppInput
              label="Valid until"
              name="validUntil"
              class="grow"
            />
            <AppInput
              label="CVV"
              name="cvv"
              class="grow"
              type="password"
              maxlength="3"
            />
          </div>
          <AppInput
            label="Cardholder name"
            name="cardholder"
          />
          
          <div class="flex justify-end w-full mt-8">
            <AppButton
              class="md:basis-1/2"
              type="submit"
              :disabled="!meta.valid"
              :loading="isSubmitting"
            >
              Continue
            </AppButton>
          </div>
        </form>
      </div>

      <div class="md:basis-1/3">
        <OrderTimer
          :seconds="secondsLeft"
          @finish="stop"
        />
      </div>
    </div>
  </main>
</template>
