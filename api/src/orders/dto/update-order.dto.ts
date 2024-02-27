import { IsEnum, IsNotEmpty } from 'class-validator';
import OrderStatus from '../enums/order-status.enum';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
