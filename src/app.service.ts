import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
 

  getHello(): Promise<string> {
    return Promise.resolve('Hello World!');
  }
}
