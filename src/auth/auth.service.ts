import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO, SignUpDTO } from './dto/auth.dto';
import { comparePassword } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: SignUpDTO) {
    const existingUser = await this.usersService.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exist');
    }
    const user = await this.usersService.createUser({ ...createUserDto });
    const access_token = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
    });

    return { user, access_token };
  }

  async login(loginDto: LoginDTO) {
    const user = await this.usersService.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const matched = comparePassword(loginDto.password, user.password);
    if (!matched) {
      throw new BadRequestException('Invalid email or password');
    }
    if (!user.isActive) {
      throw new BadRequestException('User has been deactived');
    }
    const access_token = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
    });

    return { user, access_token };
  }
}
