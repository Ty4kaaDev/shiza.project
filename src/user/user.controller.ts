import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { RUserDTO, RUserJwtDTO } from './dto/response/r-user.dto';
import { AuthGuard } from 'src/guards/user.guard';
import { SkipAuth } from 'src/decorators/skip.decorator';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @SkipAuth()
    @Post('/register')
    async register(@Body() body: RegisterUserDTO): Promise<RUserJwtDTO> {
        return await this.userService.register(body.login, body.password);
    }

    @SkipAuth()
    @Post('/login')
    async login(@Body() body: RegisterUserDTO): Promise<RUserJwtDTO> {
        return await this.userService.login(body.login, body.password);
    }
}
