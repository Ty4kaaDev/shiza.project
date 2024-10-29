import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AdvertiserService } from './advertiser.service';
import { AuthGuard, UserRequest } from 'src/guards/user.guard';
import { CreatePostDTO } from './dto/create-post.dto';

@UseGuards(AuthGuard)
@Controller('advertising')
export class AdvertiserController {
    constructor(private readonly advertiserService: AdvertiserService) {}

    @Post('/create')
    async createAdPost(
        @Req() request: UserRequest,
        @Body() body: CreatePostDTO,
    ) {
        return await this.advertiserService.createAdPost(
            request.user,
            body.name,
            body.url,
            body.formatHour.formatHour1,
            body.formatHour.formatHour2,
        );
    }

    @Get('/posts')
    async getPosts(@Req() request: UserRequest) {
        return await this.advertiserService.getPosts(request.user);
    }

    @Post('/:id')
    async clickPost(@Param('id') id: number) {
        return await this.advertiserService.clickPost(id);
    }
}
