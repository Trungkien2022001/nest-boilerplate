import { Column, Table, Model, ForeignKey } from 'sequelize-typescript';

import { User } from './users.model';
import { Role } from './role.model';

@Table({
  tableName: 'user_role',
  underscored: true,
  paranoid: true
})
export class UserRole extends Model {

  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => Role)
  roleId: number;

}
