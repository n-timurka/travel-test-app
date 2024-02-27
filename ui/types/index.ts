export type TravelType = {
  id: string;
  slug: string;
  name: string;
  description: string;
  startingDate: Date;
  endingDate: Date;
  price: number;
  seats: number;
  booked: number;
  moods: {
    nature: number;
    relax: number;
    history: number;
    culture: number;
    party: number;
  };
};

export enum OrderStatusEnum {
  NEW = "new",
  FINISHED = "finished",
  EXPIRED = "expired",
}

export type OrderType = {
  id: string;
  status: OrderStatusEnum;
  travelId: string;
  travel: TravelType;
  email: string;
  seats: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
};
