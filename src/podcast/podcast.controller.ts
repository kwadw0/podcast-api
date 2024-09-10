import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { PodcastDto, UpdatePodcastDto } from './dto/podcast.dto';
import { Podcast } from './entity/podcast.entity';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('Podcast')
@Controller('podcast')
export class PodcastController {
    constructor(
        private readonly podcastService: PodcastService
    ){}
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('coverImage'))
    @ApiConsumes('multipart/form-data')
    @Post('')
    async createPodcast(@Body() podcastDto: PodcastDto, @UploadedFile() files: Express.Multer.File): Promise<Podcast>{
        return await this.podcastService.createPodcast(podcastDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'offset', type: Number, required: false })
    async findAll(
        @Query('limit', new DefaultValuePipe(10)) limit: number, 
        @Query('offset', new DefaultValuePipe(0)) offset: number
    ): Promise<Podcast[]>{
        return await this.podcastService.findAll(offset, limit);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOneById(@Param('id') id: string): Promise<Podcast>{
        return await this.podcastService.findOneById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePodcastDto: UpdatePodcastDto): Promise<Podcast>{
        return await this.podcastService.updatePodcast(id, updatePodcastDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Podcast>{
        try {
            return await this.podcastService.deletePodcast(id);
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
