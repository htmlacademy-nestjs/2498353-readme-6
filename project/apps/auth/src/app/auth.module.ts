import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserAccountModule } from '@project/account';
import { jwtConstants } from '@project/constants';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserAccountModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}