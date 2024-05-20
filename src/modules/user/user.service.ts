import { Role, User } from "src/database/entities";
import { RegisterDto } from "../auth/dto/register.dto";
import { UsersRepository } from "./repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(
        private usersRepository: UsersRepository,
    ){}

    async createUser(data: RegisterDto): Promise<User>{
        return await this.usersRepository.create(data)
    }

    async getUserById(id: number): Promise<User> {
        return this.usersRepository.findOne({
          where: { id },
          include: [
            {
              model: Role,
              as: 'roles',
              attributes: ['id', 'name', 'code'],
              through: {
                attributes: [],
              },
            },
          ],
          raw: false,
          nest: true,
        });
      }
}