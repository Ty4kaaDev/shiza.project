import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LazyModule } from 'src/lazy/lazy.module';

@Module({
  imports: [LazyModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
