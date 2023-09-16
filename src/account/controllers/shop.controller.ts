import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ShopService } from '@src/account/services/shop.service';
import { SignUpDto } from '@src/account/dtos/shop/sign-up.dto';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { Roles } from '@src/auth/roles.decorator';
import { UserRole } from '@src/common/enums/user.enum';
import { ShopCompleteProfileDto } from '../dtos/shop/complete-profile.dto';

@Controller('shop')
export class ShopController {
  constructor(private service: ShopService) {}

  @Post('sign-up')
  signUp(@Body() payload: SignUpDto) {
    return this.service.signUp(payload);
  }

  @Post('profile/complete')
  @UseGuards(AuthGuard)
  @Roles(UserRole.SHOP)
  completeProfile(@Req() req, @Body() payload: ShopCompleteProfileDto) {
    return this.service.completeProfile({ shopId: req.user._id, payload });
  }
}
