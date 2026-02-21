import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectStravaDto {
  @ApiProperty({
    description: 'The authorization code received from Strava OAuth redirect',
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
