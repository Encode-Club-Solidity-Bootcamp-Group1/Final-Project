import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRootAsync({
    //   useFactory: () => ({ uri: process.env.MONGO_URI }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
