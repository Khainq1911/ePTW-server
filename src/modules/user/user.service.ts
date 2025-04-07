import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { emit } from 'process';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async listUser() {
    const results = await this.userRepository.find();
    return results;
  }

  async getEmail(id: number) {
    const email = await this.userRepository
      .createQueryBuilder('user')
      .select('email, name')
      .where('user.id = :id', { id: id })
      .getRawOne();
    return email;
  }
}
