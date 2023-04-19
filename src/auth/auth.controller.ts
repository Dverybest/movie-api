import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  async create(@Body() signUpDto: SignUpDTO) {
    return await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login endpoint',
  })
  @Post('/sign-in')
  async login(@Body() loginDto: LoginDTO) {
    return await this.authService.login(loginDto);
  }
}
