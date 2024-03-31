import { Controller, Get, Post, Query } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountry(): Promise<any> {
    return await this.countryService.findAll();
  }

  @Post()
  async findCountry(
    @Query('searchTerm') searchTerm: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    return await this.countryService.findCountry(searchTerm, page, limit);
  }
}
