import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Episode, EpisodeSchema } from './entity/episodes.entities';
import { EpisodesService } from './episodes.service';
import { Podcast, PodcastSchema } from 'src/podcast/entity/podcast.entity';
import { EpisodesController } from './episodes.controller';

@Module({
    imports: [MongooseModule.forFeature([
        {name: Episode.name, schema: EpisodeSchema},
        {name: Podcast.name, schema:PodcastSchema}
    ])],
    providers: [EpisodesService],
    controllers: [EpisodesController]
})
export class EpisodesModule {}
