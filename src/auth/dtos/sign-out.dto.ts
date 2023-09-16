import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignOutDto {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
