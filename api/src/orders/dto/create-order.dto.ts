import { IsEmail, IsInt, IsUUID, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsUUID()
  travelId: string;

  @IsInt()
  @IsPositive()
  seats: number;

  @IsInt()
  @IsPositive()
  total: number;
}
