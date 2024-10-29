import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create< NestExpressApplication >(
        AppModule,
        { cors: true} 
    );  
    app.use( json( { limit: '30mb' } ) );
    app.enableCors();
    app.useGlobalPipes( new ValidationPipe() );
    await app.listen(3000);
}
bootstrap();
