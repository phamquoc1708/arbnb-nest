import { ShopCompleteProfileDto } from './../dtos/shop/complete-profile.dto';
import { Injectable } from '@nestjs/common';
import { ShopRepository } from '../repositories/shop.repository';
import { SignUpDto, SignUpReturn } from '../dtos/shop/sign-up.dto';
import { AppException } from '@src/common/exceptions/app.exception';
import { CommonErrors } from '../contracts/error';
import { AbstractAuthService } from '@src/auth/services/index.service';
import { ShopDocument } from '../schemas/shop.schema';
import { Types } from 'mongoose';

@Injectable()
export class ShopService extends AbstractAuthService<
  ShopDocument,
  ShopRepository
> {
  constructor(repository: ShopRepository) {
    super(repository);
  }

  async signUp(payload: SignUpDto): Promise<SignUpReturn> {
    const foundShop = await this.repository.findOne({
      conditions: {
        email: payload.email,
      },
    });
    if (foundShop) {
      throw new AppException(CommonErrors.EMAIL_IS_EXIST);
    }

    const shop = await this.repository.create(payload);
    if (!shop) {
      throw new AppException(CommonErrors.CANNOT_CREATE_NEW_SHOP);
    }

    return {
      success: true,
    };
  }

  async completeProfile({
    shopId,
    payload,
  }: {
    shopId: string;
    payload: ShopCompleteProfileDto;
  }) {
    const shop = await this.repository.firstOrFail({
      conditions: {
        _id: new Types.ObjectId(shopId),
      },
      error: CommonErrors.OBJECT_NOT_FOUND,
    });

    shop.name = payload.name;
    shop.address = payload.address;
    await shop.save();

    return {
      isSuccess: true,
    };
  }
}
