import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StravaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async connectAccount(userId: string, code: string) {
    const clientId = this.configService.get<string>('STRAVA_CLIENT_ID');
    const clientSecret = this.configService.get<string>('STRAVA_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      throw new BadRequestException(
        'Strava configuration is missing on the server',
      );
    }

    // Exchange code for tokens
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new BadRequestException(
        data.message || 'Failed to exchange Strava code',
      );
    }

    const { access_token, refresh_token, expires_at, athlete } = data;

    // Check if this Strava athlete is already linked to ANOTHER user
    const existingAccount = await this.prisma.stravaAccount.findUnique({
      where: { athlete_id: String(athlete.id) },
    });

    if (existingAccount && existingAccount.user_id !== userId) {
      throw new ConflictException(
        'This Strava account is already linked to another user',
      );
    }

    // Upsert the strava account for the current user
    return this.prisma.stravaAccount.upsert({
      where: { user_id: userId },
      update: {
        athlete_id: String(athlete.id),
        access_token,
        refresh_token,
        expires_at,
        username:
          athlete.username || athlete.firstname + ' ' + athlete.lastname,
        profile_url: athlete.profile,
      },
      create: {
        user_id: userId,
        athlete_id: String(athlete.id),
        access_token,
        refresh_token,
        expires_at,
        username:
          athlete.username || athlete.firstname + ' ' + athlete.lastname,
        profile_url: athlete.profile,
      },
    });
  }

  async disconnectAccount(userId: string) {
    return this.prisma.stravaAccount.delete({
      where: { user_id: userId },
    });
  }
}
