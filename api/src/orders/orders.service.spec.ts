import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrdersEntity } from './entities/orders.entity';
import { OrdersService } from './orders.service';
import OrderStatus from './enums/order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';

const mockOrder = {
  id: 'cbf304ae-a335-43fa-9e56-811612dcb601',
  travelId: 'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d',
  email: 'test@test.com',
  seats: 2,
  total: 2000,
  status: OrderStatus.NEW,
} as OrdersEntity;

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<OrdersEntity>;

  const ordersRepositoryToken = getRepositoryToken(OrdersEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [
        OrdersService,
        EventEmitter2,
        SchedulerRegistry,
        {
          provide: ordersRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<OrdersEntity>>(ordersRepositoryToken);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a new order', async () => {
    jest.spyOn(repository, 'create').mockImplementationOnce(() => mockOrder);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(mockOrder);

    const dto = {
      email: mockOrder.email,
      travelId: mockOrder.travelId,
      seats: mockOrder.seats,
      total: mockOrder.total,
    } as CreateOrderDto;
    const result = await service.create(dto);

    expect(result).toEqual(expect.objectContaining(dto));
  });

  describe('findOne', () => {
    it('should not return an order item', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const result = await service.findOne('1');

      expect(result).toBe(null);
    });

    it('should return an order item', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockOrder);

      const result = await service.findOne(mockOrder.id);

      expect(result).toBe(mockOrder);
    });
  });

  describe('update', () => {
    it('should update order', async () => {
      const updatedItem: OrdersEntity = {
        ...mockOrder,
        status: OrderStatus.FINISHED,
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(mockOrder);
      jest
        .spyOn(repository, 'save')
        .mockImplementationOnce(async () => updatedItem);

      const result = await service.update(mockOrder.id, {
        status: OrderStatus.FINISHED,
      });
      expect(result).toStrictEqual(updatedItem);
    });

    it('should return an empty object', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(undefined);

      const dto = {
        status: OrderStatus.FINISHED,
      } as UpdateOrderDto;

      const result = await service.update('1', dto);

      expect(result).toBe(null);
    });
  });
});
