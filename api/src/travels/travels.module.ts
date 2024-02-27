import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelsEntity } from './travels.entity';

@Module({
  controllers: [TravelsController],
  imports: [TypeOrmModule.forFeature([TravelsEntity])],
  providers: [TravelsService],
})
export class TravelsModule {}
