import { AbstractRepository } from '@src/common/repositories';
import { Token, TokenDocument } from '@src/auth/schemas/token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

export class TokenRepository extends AbstractRepository<TokenDocument> {
  constructor(@InjectModel(Token.name) model: PaginateModel<TokenDocument>) {
    super(model);
  }
}
