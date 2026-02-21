import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../generated/client/enums';
import { User } from '../generated/client/client';

@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    // Strategy already includes strava_account if it exists
    return user;
  }

  @Get('admin-test')
  @Roles(Role.ADMIN)
  adminTest() {
    return { message: 'You have admin access' };
  }
}
