import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserRole } from '@src/common/enums/user.enum';
import { AuthDto } from './dtos/auth.dto';
import { SignOutDto } from './dtos/sign-out.dto';

@Controller('auth/:role')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signin(@Param('role') role: UserRole, @Body() data: AuthDto) {
    return this.authService.signIn(role, data);
  }

  @Delete('signout')
  async logout(@Body() data: SignOutDto) {
    await this.authService.signOut(data.refreshToken);
    return {
      success: true,
    };
  }
}
