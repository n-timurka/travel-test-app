import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';
import { TravelsEntity } from './travels.entity';

describe('NewsController', () => {
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
      const result = [];
      jest.spyOn(service, 'findMany').mockResolvedValueOnce(result);

      expect(await controller.findMany()).toBe(result);
    });
  });
});
