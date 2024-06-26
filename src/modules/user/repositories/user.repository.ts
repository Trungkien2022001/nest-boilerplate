import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import {
  Op,
  Sequelize,
  Attributes,
  WhereOptions,
  Transaction,
} from 'sequelize';
import { LOWERCASE } from 'src/constants';
import { Role } from 'src/database/entities';
import { User } from '../../../database/entities/users.model';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(@InjectModel(User) readonly model: typeof User) {
    super(model);
  }
}
