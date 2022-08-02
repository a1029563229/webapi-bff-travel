import { Injectable } from '@nestjs/common';
import { shopService } from 'src/service';

@Injectable()
export class ShopService {
  async getShopList(params: any) {
    return shopService.get('/shop/list', { params });
  }
}
