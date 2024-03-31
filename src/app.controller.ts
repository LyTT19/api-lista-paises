import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('countries')
  // async getCountries(
  //   @Body('name') name: string,
  //   @Body('region') region: string,
  // ): Promise<Country[]> {
  //   return await this.appService.getCountries(name, region);
  // }

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
