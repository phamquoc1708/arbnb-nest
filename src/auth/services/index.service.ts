import { UserRole } from '@src/common/enums/user.enum';
import { AbstractRepository } from '@src/common/repositories';
import { AuthDto } from '../dtos/auth.dto';
import { AppException } from '@src/common/exceptions/app.exception';
import { CommonErrors } from '@src/account/contracts/error';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import { Injectable } from '@nestjs/common';

class AuthDocument extends Document {
  password: string;
}

@Injectable()
export class AbstractAuthService<
  D extends AuthDocument,
  R extends AbstractRepository<D>,
> {
  constructor(public repository: R) {}

  async verifyUser(role: UserRole, data: AuthDto) {
    if (!Object.values(UserRole).includes(role))
      throw new AppException(CommonErrors.WRONG_LOGIN);
    const user = await this.repository.findOne({
      conditions: {
        email: data.email,
      },
    });
    if (!user) throw new AppException(CommonErrors.WRONG_LOGIN);
    const passwordMatches = bcrypt.compare(data.password, user.password);
    if (!passwordMatches) throw new AppException(CommonErrors.WRONG_LOGIN);
    return user;
  }
}
