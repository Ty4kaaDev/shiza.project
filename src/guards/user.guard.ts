import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { User, UserJwt } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
  
export interface UserRequest extends Request {
    payload: UserJwt;
    user: User;
    token: string;
}

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const skipCheck = this.reflector.get<boolean>(
            'skipToken',
            context.getHandler(),
        );
        if (skipCheck === true) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload: UserJwt = await this.jwtService.verifyAsync(token);
            const user = await this.userService.authByJwt(payload);
            request['jwtPayload'] = payload;
            request['user'] = user;
            request['token'] = token;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }