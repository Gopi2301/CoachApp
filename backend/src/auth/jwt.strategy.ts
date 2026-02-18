import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SUPABASE_JWT_SECRET') || 'fallback_secret_do_not_use',
    });
  }

  async validate(payload: any) {
    // payload.sub is the user ID from Supabase Auth
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    
    // Verify the user exists in our DB and fetch role
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      // It's possible the trigger hasn't fired yet or failed, handle gracefully
      throw new UnauthorizedException('User not initialized in backend');
    }

    return user;
  }
}
