import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserJwt } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { RUserDTO, RUserJwtDTO } from './dto/response/r-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async authByJwt(jwt: UserJwt): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id: jwt.sub,
            },
        });

        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return user;
    }

    async register(login: string, password: string): Promise<RUserJwtDTO> {
        let user = await this.userRepository.findOne({
            where: {
                login: login,
            },
        });

        if (user)
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await this.userRepository.save({
            login: login,
            password: hashedPassword,
        });

        return {
            user: this.prepareUser(user),
            token: await this.getTokenWithUser(user),
        };
    }

    async login(login: string, password: string): Promise<RUserJwtDTO> {
        const user = await this.userRepository.findOne({
            where: {
                login: login,
            },
        });

        if (!user) {
            throw new HttpException('Invalid login', HttpStatus.BAD_REQUEST);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
        }

        return {
            user: this.prepareUser(user),
            token: await this.getTokenWithUser(user),
        };
    }

    async getTokenWithUser(user: User) {
        return await this.jwtService.signAsync({
            sub: user.id,
            iss: 'user',
        });
    }

    prepareUser(user: User): RUserDTO {
        return {
            id: user.id,
            login: user.login,
            balance: user.balance,
        };
    }
}
