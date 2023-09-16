import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { TokenRepository } from './repositories/token.repository';
import { AuthController } from './auth.controller';
import { AccountModule } from '@src/account/account.module';
import { ShopService } from '@src/account/services/shop.service';

@Module({})
export class AuthModule {
  static forRootAsync({ imports, ...options }: any): DynamicModule {
    const providers = [];
    for (const key in options) {
      providers.push({
        provide: `${key}Service`,
        useExisting: options[key].service,
      });
    }

    return {
      module: AuthModule,
      imports: [
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
        JwtModule.register({
          global: true,
        }),
        AccountModule,
        // ...imports,
      ],
      providers: [...providers, AuthService, TokenRepository, ShopService],
      controllers: [AuthController],
    };
  }
}
