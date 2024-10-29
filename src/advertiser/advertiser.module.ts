import { Module } from '@nestjs/common';
import { AdvertiserController } from './advertiser.controller';
import { AdvertiserService } from './advertiser.service';
import { LazyModule } from 'src/lazy/lazy.module';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [LazyModule],
    controllers: [AdvertiserController],
    providers: [AdvertiserService, UserService],
})
export class AdvertiserModule {}
