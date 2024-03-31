import { Injectable } from '@nestjs/common';
import { CountryEntity } from './country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as NodeCache from 'node-cache';

@Injectable()
export class CountryService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 300 }); // 5 minutes
  }

  @InjectRepository(CountryEntity)
  private readonly countryRepository: Repository<CountryEntity>;

  async findAll(): Promise<CountryEntity[]> {
    try {
      const cachedData: any = this.cache.get('countries');
      if (cachedData) {
        cachedData.source = 'cache';
        return cachedData;
      }

      const countries = await this.countryRepository.find();
      this.cache.set('countries', countries);
      return countries;
    } catch (error) {
      console.error(error);
    }
  }

  async findCountry(
    searchTerm?: string,
    page = 1,
    limit = 10,
  ): Promise<CountryEntity[]> {
    try {
      const cacheKey = `countries:${searchTerm || 'all'}:${page}:${limit}`;
      const cachedData: any = this.cache.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      let query = this.countryRepository.createQueryBuilder('country');

      if (searchTerm) {
        query = query
          .where('LOWER(country.name) LIKE LOWER(:searchTerm)', {
            searchTerm: `%${searchTerm}%`,
          })
          .orWhere('LOWER(country.region) LIKE LOWER(:searchTerm)', {
            searchTerm: `%${searchTerm}%`,
          });
      }

      query = query.skip((page - 1) * limit).take(limit);

      const countries = await query.getMany();

      this.cache.set(cacheKey, countries);

      return countries;
    } catch (error) {
      console.error(error);
    }
  }
}
