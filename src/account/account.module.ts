import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopController } from '@src/account/controllers/shop.controller';
import { ShopService } from '@src/account/services/shop.service';
import { ShopRepository } from '@src/account/repositories/shop.repository';
import { Shop, ShopSchema } from '@src/account/schemas/shop.schema';
import { CommonModule } from '@src/common/common.module';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  controllers: [ShopController],
  providers: [ShopService, ShopRepository],
  exports: [ShopRepository, ShopService],
})
export class AccountModule {}
