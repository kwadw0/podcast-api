import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class PodcastDto {
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
        type: String
    })
    @IsOptional()
    @IsString()
    coverImage: string;

    @ApiProperty({
        type: String,
        example: '9322c384-fd8e-4a13-80cd-1cbd1ef95ba8'
    })
    @IsNotEmpty()
    @Type(() => Types.ObjectId)
    userId: Types.ObjectId;

    @ApiProperty({
        type: String
    })
    @IsString()
    category: string;

    @ApiProperty({
        type: [String]
    })
    @IsOptional()
    @IsArray()
    tags: string[]

}

export class UpdatePodcastDto extends PartialType(OmitType(PodcastDto, ['userId'])){}
