import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TravelsService } from './travels.service';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  findMany() {
    return this.travelsService.findMany();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const travel = await this.travelsService.findOne(slug);
    if (!travel) {
      throw new NotFoundException("Item wasn't found");
    }

    return travel;
  }
}
