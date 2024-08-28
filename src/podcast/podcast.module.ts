import { Module } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Podcast, PodcastSchema } from './entity/podcast.entity';
import { PodcastController } from './podcast.controller';
import { User, UserSchema } from 'src/users/entity/users.entity';

@Module({
    imports: [MongooseModule.forFeature([
    {
        name: Podcast.name, schema: PodcastSchema
    },
    {
        name: User.name, schema: UserSchema
    }
])],
    providers: [PodcastService],
    controllers: [PodcastController],
    exports: [PodcastService]
})
export class PodcastModule {
    
}
