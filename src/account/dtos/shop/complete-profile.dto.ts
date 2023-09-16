import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class Address {
  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  stress: string;

  @IsNotEmpty()
  @IsString()
  buildingNumber: string;
}

export class ShopCompleteProfileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Type(() => Address)
  @ValidateNested()
  address: Address;
}
