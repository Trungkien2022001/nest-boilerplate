import { Column, Table, Model, BelongsToMany } from 'sequelize-typescript';

import { User } from './users.model';
import { UserRole } from './user-role.model';

@Table({
  tableName: 'role',
  underscored: true,
  paranoid: true
})
export class Role extends Model {
  @Column
  code: string;

  @Column
  name: string;

  @Column
  isAdmin: boolean;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];

}
