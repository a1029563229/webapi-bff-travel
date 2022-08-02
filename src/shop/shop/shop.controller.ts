import { Controller, Get, Query } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('list')
  getShopList(@Query() params: any) {
    return this.shopService.getShopList(params);
  }
}
