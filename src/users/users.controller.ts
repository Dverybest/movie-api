import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Auth } from 'src/auth/auth.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for admin to the fetch all users' })
  @ApiOkResponse({
    description: 'fetch all users successful',
    type: Array<User>,
  })
  @Auth()
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'fetch user successful',
    type: User,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Endpoint to fetch user by id' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
