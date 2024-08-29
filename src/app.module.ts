import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ExcercisesModule } from './excercises/excercises.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: process.env.NODE_ENV === 'development' ? true : false, // your entities will be synced with the database(recommended: disable in prod)
    }),
    ExcercisesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
