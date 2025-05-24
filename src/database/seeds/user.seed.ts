import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

export class UserSeed implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UserEntity);

    const hashPassword = await bcrypt.hash('1234', 10);

    await repo.save([
      {
        name: 'Admin',
        email: 'Admin@gmail.com',
        phone: '0393037180',
        password: hashPassword,
        roleId: 2,
      },
    ]);
  }
}
