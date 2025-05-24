import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RoleEntity } from '../entities/role.entity';

export default class InitRole implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(RoleEntity);
    await repo.save([{ name: 'Worker' }, { name: 'Supervisor' }, { name: 'Admin' }]);
  }
}
