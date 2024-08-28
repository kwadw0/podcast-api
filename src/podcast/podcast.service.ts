import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Podcast } from './entity/podcast.entity';
import { Model } from 'mongoose';
import { PodcastDto, UpdatePodcastDto } from './dto/podcast.dto';
import { User } from 'src/users/entity/users.entity';

@Injectable()
export class PodcastService {
    constructor(
        @InjectModel(Podcast.name)
        private readonly podcastModel: Model<Podcast>,
        @InjectModel(User.name)
        private readonly userModel: Model<Podcast>
    ){}

    async createPodcast(podcastDto: PodcastDto): Promise<Podcast>{
        try {
            const {userId} = podcastDto;
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundException('User id not found');
            }
            const podcast = await this.podcastModel.create({...podcastDto, user: user._id});
            return podcast;
        } catch (error) {
            console.log(error);
            if (error.status === 404) {
                throw new NotFoundException('User id not found');
            }
            throw new InternalServerErrorException();
        }
    }

    async findAll(offset: number, limit: number):Promise<Podcast[]>{
        try {
            const allPodcast = await this.podcastModel.find()
            .skip(offset)
            .limit(limit)
            .exec();
            return allPodcast;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async findOneById(id: string): Promise<Podcast>{
        try {
            const podcast = await this.podcastModel.findById(id);
            if (!podcast) {
                throw new NotFoundException('Podcast does not exist');
            }
            return podcast;
        } catch (error) {
            console.log(error);
            if (error.status === 404) {
                throw new NotFoundException('Podcast does not exist');
            } 
            throw new InternalServerErrorException();
        }
    }

    async updatePodcast(id: string, updatePodcastDto: UpdatePodcastDto): Promise<Podcast>{
        try {
            const updatePodcast = await this.podcastModel.findByIdAndUpdate(id, updatePodcastDto);
            return updatePodcast;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deletePodcast(id: string): Promise<Podcast>{
        try {
            const deletePodcast = await this.podcastModel.findByIdAndDelete(id);
            return deletePodcast;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
