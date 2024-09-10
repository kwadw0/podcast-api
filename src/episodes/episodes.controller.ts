import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EpisodesService } from './episodes.service';
import { Episode } from './entity/episodes.entities';
import { EpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Episodes')
@Controller('episodes')
export class EpisodesController {
    constructor(
        private readonly episodeService: EpisodesService,
    ){}

    @UseGuards(AuthGuard('jwt'))
    @ApiQuery({name: 'offset', type: Number, required: false})
    @ApiQuery({name: 'limit', type: Number, required: false})
    @Get('')
    async getAllepisode(@Query() offset: number, @Query() limit: number): Promise<Episode[]>{
        return await this.episodeService.findAllEpisodes(offset, limit);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getEpisode(@Param('id') id: string): Promise<Episode>{
        return await this.episodeService.findEpisodeById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1},
        {name: 'audioFIle', maxCount: 1}
    ]))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'create episode',
        type: EpisodeDto,
    })
    @Post('')
    async  createEpisode(@Body() episodeDto: EpisodeDto, @UploadedFile() files: {images: Express.Multer.File[], audioFile: Express.Multer.File[]}): Promise<Episode>{
        //console.log(files);
        return await this.episodeService.create(episodeDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updateEpisode(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto): Promise<Episode>{
        return await this.episodeService.updateEpisode(id, updateEpisodeDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteEpisode(@Param('id') id: string): Promise<Episode>{
        return await this.episodeService.deleteEpisode(id);
    }
}
