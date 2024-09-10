import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class EpisodeDto {

    @ApiProperty({
        type: String,
        example: '66cf2bff0a7c1dd91d52b42c'
    })
    @IsString()
    podcastId: string;

    @ApiProperty({
        type: String
    })
    @IsString()
    title: string;

    @ApiProperty({
        type: String
    })
    @IsString()
    description: string;

    @ApiProperty({
        type: String,
        format: 'binary'
    })
    @IsString()
    image: string;

    @ApiProperty({
        type: String,
        format: 'binary'
    })
    @IsString()
    audioFile: any;

    @ApiProperty({
        type: Date
    })
    @IsString()
    releaseDate: Date
}

export class UpdateEpisodeDto extends PartialType(OmitType(EpisodeDto, ['podcastId', 'audioFile'])){}