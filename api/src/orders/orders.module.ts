import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersEntity } from './entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([OrdersEntity])],
  providers: [OrdersService],
})
export class OrdersModule {}
