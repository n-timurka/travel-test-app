import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelsEntity } from './travels.entity';
import { OnEvent } from '@nestjs/event-emitter';
import OrderStatus from '../orders/enums/order-status.enum';
import { OrdersEntity } from 'src/orders/entities/orders.entity';

@Injectable()
export class TravelsService {
  constructor(
    @InjectRepository(TravelsEntity)
    private readonly travelsRepository: Repository<TravelsEntity>,
  ) {}

  public async findMany(): Promise<TravelsEntity[]> {
    return this.travelsRepository.find();
  }

  public async findOne(slug: string): Promise<TravelsEntity | null> {
    return this.travelsRepository.findOneBy({ slug });
  }

  @OnEvent('order.created')
  async handleOrderCreatedEvent(event: { travelId: string; seats: number }) {
    const travel = await this.travelsRepository.findOneBy({
      id: event.travelId,
    });

    travel.booked += event.seats;

    await this.travelsRepository.save(travel);
  }

  @OnEvent('order.updated')
  async handleOrderUpdatedEvent(event: {
    old: OrdersEntity;
    new: OrdersEntity;
  }) {
    const travel = await this.travelsRepository.findOneBy({
      id: event.new.travelId,
    });

    if (
      event.new.status === OrderStatus.EXPIRED &&
      event.old.status !== OrderStatus.EXPIRED
    ) {
      travel.booked -= event.old.seats;

      await this.travelsRepository.save(travel);
    }
  }
}
