import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';
import { PORT, Environment } from '../../constants';
import { DEFAULT_USER_SERVICE_PORT } from './constants';

export class UserServiceConfiguration {
  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = DEFAULT_USER_SERVICE_PORT;

  @IsEnum(Environment)
  @IsNotEmpty()
  public environment: Environment;

  @IsNotEmpty()
  @IsString()
  public appHost: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
