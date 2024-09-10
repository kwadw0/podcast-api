import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Episode } from './entity/episodes.entities';
import { InjectModel } from '@nestjs/mongoose';
import { EpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';
import { Podcast } from 'src/podcast/entity/podcast.entity';

@Injectable()
export class EpisodesService {
    constructor(
        @InjectModel(Episode.name)
        private readonly episodeModel: Model<Episode>,
        @InjectModel(Podcast.name)
        private readonly podcastModel: Model<Podcast>
    ){}

    async create(episodeDto: EpisodeDto): Promise<Episode>{
        try {
            const {podcastId}=episodeDto;
            const existingPodcast = await this.podcastModel.findById({_id: podcastId});
            if(!existingPodcast){
                throw new NotFoundException("Podacast not found");
            }
            const episode = await this.episodeModel.create({...episodeDto, _id: podcastId});
            return episode;
            
        } catch (error) {
            console.log(error);
            if (error.status === 404) {
                throw new NotFoundException("Podacast not found");
            }
            throw new InternalServerErrorException();
        }
    }

    async findAllEpisodes(offset: number, limit: number): Promise<Episode[]>{
        try {
            const episodes = await this.episodeModel.find()
            .skip(offset)
            .limit(limit);
            return episodes;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async findEpisodeById(id: string): Promise<Episode>{
        try {
            const existingEpisode = await this.episodeModel.findById({_id: id});
            if (!existingEpisode) {
                throw new NotFoundException('Episode not found');
            }
            return existingEpisode;
        } catch (error) {
            console.log(error);
            if(error.status === 404){
                throw new NotFoundException('Episode not found');
            }
            throw new InternalServerErrorException();
        }
    }

    async updateEpisode(id: string, updateEpisodeDto: UpdateEpisodeDto): Promise<Episode>{
        try {
            const updateEpisode = await this.episodeModel.findByIdAndUpdate(id, updateEpisodeDto);
            if (!updateEpisode) {
                throw new NotFoundException('Episode not found');
            }
            return updateEpisode;
        } catch (error) {
            console.log(error);
            if(error.status === 404){
                throw new NotFoundException('Episode not found');
            }
            throw new InternalServerErrorException();
        }
    }

    async deleteEpisode(id: string): Promise<Episode>{
        try {
            const deleteEpisode = await this.episodeModel.findByIdAndDelete(id);
            if (!deleteEpisode) {
                throw new NotFoundException('Episode not found');
            }
            return deleteEpisode;
        } catch (error) {
            console.log(error);
            if(error.status === 404){
                throw new NotFoundException('Episode not found');
            }
            throw new InternalServerErrorException();
        }
    }
}
