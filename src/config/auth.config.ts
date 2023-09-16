import { ShopService } from '@src/account/services/shop.service';
import { UserRole } from '@src/common/enums/user.enum';

export default {
  [UserRole.SHOP]: {
    role: UserRole.SHOP,
    service: ShopService,
  },
};
