import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './common/application/application.module';
import { CommonModule } from './common/common/common.module';
import { MapModule } from './common/third/map/map.module';
import { WxModule } from './common/third/wx/wx.module';
import { ShopModule } from './shop/shop/shop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CommonModule,
    MapModule,
    WxModule,
    ShopModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // * 代表该中间件在所有路由均生效
  }
}
