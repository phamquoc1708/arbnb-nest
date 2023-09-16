import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { AccountModule } from './account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import authConfig from './config/auth.config';

@Module({
  imports: [
    AuthModule.forRootAsync({
      imports: [
        forwardRef(() => {
          AccountModule;
        }),
      ],
      ...authConfig,
    }),
    CommonModule,
    AccountModule,
    MongooseModule.forRoot(
      process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/',
    ),
    RouterModule.register([
      {
        path: '/',
        module: AccountModule,
      },
    ]),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
