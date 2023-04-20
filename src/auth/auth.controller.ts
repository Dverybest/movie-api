import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO, SignUpDTO } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create user account endpoint',
  })
  @Post('/sign-up')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() signUpDto: SignUpDTO) {
    return await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login endpoint',
  })
  @Post('/sign-in')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginDto: LoginDTO) {
    return await this.authService.login(loginDto);
  }
}
