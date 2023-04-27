import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO, SignUpDTO } from './dto/auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { accountCreated, loginEmail } from 'src/templates';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private mailerService: MailerService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create user account endpoint',
  })
  @Post('/sign-up')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() signUpDto: SignUpDTO) {
    const res = await this.authService.signUp(signUpDto);
    this.mailerService.sendMail({
      to: res.user.email,
      subject: 'Sign up successful',
      html: accountCreated({
        name: res.user.fullName,
        username: res.user.email,
      }),
    });
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login endpoint',
  })
  @Post('/sign-in')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginDto: LoginDTO, @Req() req: Request) {
    const res = await this.authService.login(loginDto);
    this.mailerService.sendMail({
      to: res.user.email,
      subject: 'Sign in successful',
      html: loginEmail({
        name: res.user.fullName,
        ip: req.ip,
        location :req.hostname
      }),
    });
    return res;
  }
}
