import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StravaService } from './strava.service';
import { StravaController } from './strava.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    PrismaModule,
  ],
  providers: [JwtStrategy, AuthService, StravaService],
  controllers: [AuthController, StravaController],
  exports: [PassportModule, AuthService, StravaService],
})
export class AuthModule {}
