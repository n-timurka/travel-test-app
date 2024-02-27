import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import OrderStatus from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
    private readonly eventEmitter: EventEmitter2,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  public async findOne(id: string): Promise<OrdersEntity | null> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['travel'],
    });
  }

  public async create(createOrderDto: CreateOrderDto): Promise<OrdersEntity> {
    const order = new OrdersEntity();

    order.email = createOrderDto.email;
    order.travelId = createOrderDto.travelId;
    order.seats = createOrderDto.seats;
    order.total = createOrderDto.total;

    await this.ordersRepository.save(order);

    // Fire event (to update travel, decrease number of available seats)
    this.eventEmitter.emit('order.created', order);

    // create a timeout, update order status after 15 minutes
    this.checkOrder(order.id);

    return order;
  }

  private checkOrder(orderId: string) {
    const timeout = setTimeout(
      async () => {
        const order = await this.ordersRepository.findOne({
          where: { id: orderId },
          relations: ['travel'],
        });

        if (order.status === OrderStatus.NEW) {
          order.status = OrderStatus.EXPIRED;
          await this.ordersRepository.save(order);
        }
      },
      1000 * 60 * 60 * 15,
    );

    this.schedulerRegistry.addTimeout(`order-${orderId}`, timeout);
  }

  public async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrdersEntity | null> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (!order) return null;

    const old = { ...order };

    order.status = updateOrderDto.status;
    await this.ordersRepository.save(order);

    this.eventEmitter.emit('order.updated', {
      old,
      new: order,
    });

    return order;
  }
}
