import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';
import { TravelsEntity } from './travels.entity';

const mockTravel = {
  id: 'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d',
  slug: 'jordan-360',
  name: 'Jordan 360°',
  description:
    'Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert, the ancient beauty of Petra, and much more.\n\nVisiting Jordan is one of the most fascinating things that everyone has to do once in their life.You are probably wondering "Why?". Well, that\'s easy: because this country keeps several passions! During our tour in Jordan, you can range from well-preserved archaeological masterpieces to trekkings, from natural wonders excursions to ancient historical sites, from camels trek in the desert to some time to relax.\nDo not forget to float in the Dead Sea and enjoy mineral-rich mud baths, it\'s one of the most peculiar attractions. It will be a tour like no other: this beautiful country leaves a memorable impression on everyone.',
  startingDate: '2021-11-01',
  endingDate: '2021-11-09',
  price: 199900,
  seats: 5,
  booked: 0,
  moods: {
    nature: 80,
    relax: 20,
    history: 90,
    culture: 30,
    party: 10,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
} as TravelsEntity;

describe('TravelsController', () => {
  let controller: TravelsController;
  let service: TravelsService;
  let repository: Repository<TravelsEntity>;

  const travelsRepositoryToken = getRepositoryToken(TravelsEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [TravelsController],
      providers: [
        TravelsService,
        {
          provide: travelsRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TravelsService>(TravelsService);
    controller = module.get<TravelsController>(TravelsController);
    repository = module.get<Repository<TravelsEntity>>(travelsRepositoryToken);
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

  describe('findAll', () => {
    it('should return an empty array', async () => {
      const result = [];
      jest.spyOn(service, 'findMany').mockResolvedValueOnce(result);

      expect(await controller.findMany()).toBe(result);
    });

    it('should return an array of travels', async () => {
      const result = [mockTravel];
      jest.spyOn(service, 'findMany').mockResolvedValueOnce(result);

      expect(await controller.findMany()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one travel', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockTravel);

      expect(await controller.findOne(mockTravel.id)).toBe(mockTravel);
    });

    it('should return not found message', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(controller.findOne('test')).rejects.toThrow(
        "Item wasn't found",
      );
    });
  });
});
