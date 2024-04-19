import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "../user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { TrimSpacePipe } from "src/common/pipes/trim-space.pipe";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor (
        private readonly userService: UserService
    ){}

    @ApiOperation({
        summary: "API Register for user"
    })
    @ApiBody({
        type: RegisterDto,
        required: true,
        description: "Register DTO"
    })
    @UsePipes(new TrimSpacePipe())
    @Post('register')
    async register(
        @Body() payload: RegisterDto,
    ){
        return this.userService.createUser(payload);
    }

}