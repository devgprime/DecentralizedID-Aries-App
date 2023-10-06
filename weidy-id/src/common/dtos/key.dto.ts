import { IsString, IsNotEmpty } from 'class-validator';

export class KeyDto {
  @IsString()
  @IsNotEmpty()
  walletId: string;

  @IsString()
  @IsNotEmpty()
  walletKey: string;

  @IsString()
  seed?: string;
}
