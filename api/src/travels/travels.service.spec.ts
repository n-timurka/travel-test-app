import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { TravelsService } from './travels.service';
import { TravelsEntity } from './travels.entity';

describe('TravelsService', () => {
  let service: TravelsService;
  let repository: Repository<TravelsEntity>;

  const travelsRepositoryToken = getRepositoryToken(TravelsEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [
        TravelsService,
        {
          provide: travelsRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TravelsService>(TravelsService);
    repository = module.get<Repository<TravelsEntity>>(travelsRepositoryToken);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an empty list', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
      const result = await service.findMany();

      expect(result).toStrictEqual([]);
    });

    it('should return a list of travels', async () => {
      const items = [] as TravelsEntity[];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(items);
      const result = await service.findMany();

      expect(result).toStrictEqual(items);
    });
  });
});
