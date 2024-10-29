import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdPost } from './models/adPost.model';
import { Repository } from 'typeorm';
import { User } from 'src/user/models/user.model';
import { InjectClickHouse } from '@md03/nestjs-clickhouse';
import type { ClickHouseClient } from '@clickhouse/client';

@Injectable()
export class AdvertiserService {
    constructor(
        @InjectRepository(AdPost)
        private readonly adPostRepository: Repository<AdPost>,
        @InjectClickHouse() private readonly clickHouse: ClickHouseClient,
    ) {}

    async createAdPost(
        user: User,
        name: string,
        url: string,
        formatHour1: number,
        formatHour2: number,
    ): Promise<AdPost> {
        return await this.adPostRepository.save({
            authorId: user.id,
            name: name,
            url: url,
            formatHour1: formatHour1,
            formatHour2: formatHour2,
        });
    }

    async getPosts(user: User) {
        return await this.adPostRepository.find({
            where: {
                authorId: user.id,
            },
        });
    }

    async clickPost(id: number) {
        return await this.adPostRepository.increment({ id }, 'clicks', 1);
    }
}
