import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
}
