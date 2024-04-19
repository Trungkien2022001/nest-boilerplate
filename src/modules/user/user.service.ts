import { User } from "src/database/entities";
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
}