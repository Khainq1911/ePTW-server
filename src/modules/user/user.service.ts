import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async listUser() {
    const results = await this.userRepository.find();
    return results;
  }

  async getEmail(id: number): Promise<string | undefined> {
    const email: string | undefined = await this.userRepository
      .createQueryBuilder('user')
      .select('email, name, telegram_id')
      .where('user.id = :id', { id: id })
      .getRawOne();

    return email;
  }

  async ListUserByRole(roleId: number) {
    const result = await this.userRepository.find({ where: { roleId } });
    return result;
  }
}
