import { type TravelType } from "~/types";

export default function useTravel(travel: TravelType | Ref<TravelType>) {
  const value = toValue(travel);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  const dayjs = useDayjs();

  const startingDate = computed(() =>
    dayjs(value.startingDate).format("DD MMM")
  );
  const endingDate = computed(() => dayjs(value.endingDate).format("DD MMM"));
  const daysBetween = computed(() =>
    dayjs(value.endingDate).diff(value.startingDate, "day")
  );
  const price = computed(() => formatter.format(value.price));

  return {
    startingDate,
    endingDate,
    daysBetween,
    price,
  };
}
