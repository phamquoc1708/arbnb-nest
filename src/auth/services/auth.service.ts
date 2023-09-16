import { TokenRepository } from '@src/auth/repositories/token.repository';
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@src/common/enums/user.enum';
import { AuthDto } from '../dtos/auth.dto';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private jwtService: JwtService,
    private tokenRepository: TokenRepository,
  ) {}

  async signIn(role: UserRole, data: AuthDto) {
    const service = this.moduleRef.get(`${role}Service`);
    const user = await service.verifyUser(role, data);
    const tokens = await this.getTokens({
      userId: user._id,
      email: user.email,
      role,
    });
    await this.tokenRepository.create({
      userId: user._id,
      role,
      expiredAt: moment().add(7, 'd').toDate(),
      ...tokens,
    });
    return tokens;
  }

  async signOut(refreshToken: string) {
    return this.tokenRepository.removeMany({ refreshToken });
  }

  async getTokens(data: { userId: string; email: string; role: UserRole }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          _id: data.userId,
          role: data.role,
          email: data.email,
        },
        {
          secret: 'JWT_ACCESS_SECRET',
          expiresIn: '7days',
        },
      ),
      this.jwtService.signAsync(
        {
          _id: data.userId,
          role: data.role,
          email: data.email,
        },
        {
          secret: 'JWT_REFRESH_SECRET',
          expiresIn: '30days',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
