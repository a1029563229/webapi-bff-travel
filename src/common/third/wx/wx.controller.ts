import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { WxLoginDto } from './wx.dto';
import { WxService } from './wx.service';

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() wxLogin: WxLoginDto) {
    const openId = await this.wxService.queryOpenId(wxLogin);

    return openId;
  }
}
