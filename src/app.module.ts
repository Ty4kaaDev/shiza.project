import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvertiserModule } from './advertiser/advertiser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickHouseModule } from '@md03/nestjs-clickhouse';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AdvertiserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mydatabase',
      entities: ['dist/**/*.model{.ts,.js}'],
      synchronize: true,
    }),
    ClickHouseModule.forRootAsync({
      name: 'default',
      useFactory: () => ({
        url: 'http://localhost:8123',
        username: 'user',
        password: 'password',
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}