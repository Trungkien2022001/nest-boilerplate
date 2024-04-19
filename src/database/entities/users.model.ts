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

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  avatarUrl: string;

  @Column
  password: string;

  @Column({
    defaultValue: EUserStatus.ACTIVE,
    type: DataType.ENUM(...Object.values(EUserStatus)),
  })
  status: string;

  @Column
  currentRole: string;

  @Column
  createdBy: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  updatedBy: number;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @Column
  deletedAt: Date;

  @Column
  isVerified: boolean;

}
