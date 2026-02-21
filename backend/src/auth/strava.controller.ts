import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StravaService } from './strava.service';
import { GetUser } from './decorators/get-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../generated/client/client';
import { ConnectStravaDto } from './dto/connect-strava.dto';

@ApiTags('Strava')
@ApiBearerAuth()
@Controller('auth/strava')
@UseGuards(JwtAuthGuard)
export class StravaController {
  constructor(private readonly stravaService: StravaService) {}

  @Post('connect')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connect Strava account' })
  @ApiResponse({
    status: 200,
    description: 'Strava account connected successfully',
  })
  async connect(@GetUser() user: User, @Body() connectDto: ConnectStravaDto) {
    return this.stravaService.connectAccount(user.id, connectDto.code);
  }

  @Delete('disconnect')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Disconnect Strava account' })
  @ApiResponse({
    status: 204,
    description: 'Strava account disconnected successfully',
  })
  async disconnect(@GetUser() user: User) {
    await this.stravaService.disconnectAccount(user.id);
  }
}
