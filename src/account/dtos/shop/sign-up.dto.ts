import { IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}

export class SignUpReturn {
  @IsNotEmpty()
  success: boolean;
}
