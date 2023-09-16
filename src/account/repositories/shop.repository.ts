import { AbstractRepository } from '@src/common/repositories';
import { Shop, ShopDocument } from '@src/account/schemas/shop.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

export class ShopRepository extends AbstractRepository<ShopDocument> {
  constructor(@InjectModel(Shop.name) model: PaginateModel<ShopDocument>) {
    super(model);
  }
}
