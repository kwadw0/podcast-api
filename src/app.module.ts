import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PodcastModule } from './podcast/podcast.module';
import { EpisodesModule } from './episodes/episodes.module';
import { PlaylistModule } from './playlist/playlist.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule, 
    UsersModule,
    PodcastModule,
    EpisodesModule,
    PlaylistModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
