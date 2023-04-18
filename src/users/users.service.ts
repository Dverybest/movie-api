import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create() {
    return 'This action adds a new user';
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(option: FindOneOptions<User>) {
    return this.usersRepository.findOne(option);
  }
}
