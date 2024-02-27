<script setup lang="ts">
import type { OrderType, TravelType } from '~/types';
import { useForm } from 'vee-validate';
import { object, string, number } from 'yup';

const { $api } = useNuxtApp();
const { slug } = useRoute().params;

const { data: travel } = await useAsyncData<TravelType>((() => $api(`/travels/${slug}`)))
if (!travel.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

const { defineField, meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: object({
    email: string().email().required(),
    seats: number().required().positive().integer().max(travel.value.seats - travel.value.booked),
  }),
});

const [seats] = defineField('seats');

const onSubmit = handleSubmit(async (values) => {
  const { data: order } = await useAsyncData<OrderType>(() => $api('/orders', {
      method: 'POST',
      body: {
        ...values,
        travelId: travel.value?.id,
        total: seats.value * (travel.value?.price || 0),
      }
    }))
    if (order.value) {
      navigateTo({ name: 'orders-id', params: { id: order.value.id } })
    }
});
</script>

<template>
  <main class="md:w-[72rem] md:mx-auto my-8 bg-white p-8 rounded shadow-md self-start">
    <div class="flex flex-col md:flex-row md:space-x-8">
      <div class="flex-1 flex flex-col">
        <h1 class="text-2xl font-semibold">
          Checkout
        </h1>
        <div class="rounded bg-slate-100 text-slate-600 text-sm p-4 my-4">
          Please, input your email and the number of seats you want to book. You can't book more then 5 seats.
        </div>
        <form
          v-if="travel"
          class="flex flex-col space-y-4"
          @submit.prevent="onSubmit"
        >
          <AppInput
            label="E-mail"
            name="email"
          />
          <CheckoutSeatsCounter
            v-model="seats"
            :max="travel.seats - travel.booked"
          />
          <div class="flex space-x-8 w-full">
            <AppButton
              variant="secondary"
              class="grow"
              to="/"
            >
              Back
            </AppButton>
            <AppButton
              class="grow"
              type="submit"
              :disabled="!meta.valid"
              :loading="isSubmitting"
            >
              Continue
            </AppButton>
          </div>
        </form>
      </div>
      <div
        v-if="travel"
        class="md:basis-1/3"
      >
        <CheckoutTravelSummary
          :travel="travel"
          :seats="seats"
        />
      </div>
    </div>
  </main>
</template>
