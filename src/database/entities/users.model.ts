import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { EUserStatus } from 'src/enums';
import { Role } from './role.model';
import { UserRole } from './user-role.model';
@Table({
  tableName: 'user',
  underscored: true,
  paranoid: true
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({field: 'first_name'})
  first_name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  phone_number: string;

  @Column
  avatar_url: string;

  @Column
  password: string;

  @Column({
    defaultValue: EUserStatus.ACTIVE,
    type: DataType.ENUM(...Object.values(EUserStatus)),
  })
  status: string;

  @Column
  current_role: string;

  @Column
  created_by: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @Column
  deleted_at: Date;

  @Column
  is_verified: boolean;

}
