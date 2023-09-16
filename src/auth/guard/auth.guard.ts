import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppException } from '@src/common/exceptions/app.exception';
import { CommonErrors } from '@src/account/contracts/error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) throw new AppException(CommonErrors.AUTHENTICATION);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'JWT_ACCESS_SECRET',
      });
      request['user'] = payload;
    } catch {
      throw new AppException(CommonErrors.AUTHENTICATION);
    }
    return true;
  }
}
