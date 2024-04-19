import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UsersRepository } from "./repositories/user.repository";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role, User, UserRole } from "src/database/entities";

@Module({
    imports: [
        SequelizeModule.forFeature([
            User,
          ]),
    ],
    controllers: [UserController],
    providers: [UserService, UsersRepository],
    exports: [UserService],
})
export class UserModule {}