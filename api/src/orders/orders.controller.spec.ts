import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersEntity } from './entities/orders.entity';
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

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;
  let repository: Repository<OrdersEntity>;

  const ordersRepositoryToken = getRepositoryToken(OrdersEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [OrdersController],
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
    controller = module.get<OrdersController>(OrdersController);
    repository = module.get<Repository<OrdersEntity>>(ordersRepositoryToken);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create an order item', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockOrder);

      const dto = {
        email: mockOrder.email,
        travelId: mockOrder.travelId,
        seats: mockOrder.seats,
        total: mockOrder.total,
      } as CreateOrderDto;

      expect(await controller.create(dto)).toBe(mockOrder);
    });
  });

  describe('findOne', () => {
    it('should return one order', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockOrder);

      expect(await controller.findOne(mockOrder.id)).toBe(mockOrder);
    });
  });

  describe('update', () => {
    it('should update the order', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(mockOrder);

      const dto = {
        status: OrderStatus.FINISHED,
      } as UpdateOrderDto;

      expect(await controller.update(mockOrder.id, dto)).toStrictEqual({
        status: OrderStatus.FINISHED,
        ...mockOrder,
      });
    });
  });
});
