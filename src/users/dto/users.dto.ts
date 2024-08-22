import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({
        description:'Users lastname',
        type: String
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description:'Users fisrtname',
        type: String
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'email',
        type: String
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description:'username',
        type: String
    })
    @IsString()
    username: string;

    @ApiProperty({
        description:'Phone Number',
        type: String
    })
    @IsString()
    @IsOptional()
    phoneNumber: string;

    @ApiProperty({
        description:'Profile picture',
        type: String
    })
    @IsString()
    @IsOptional()
    profilePicture: string

    @ApiProperty({
        description:'bio description',
        type: String
    })
    @IsString()
    @IsOptional()
    bio: string
}

export class UpdateUserDto extends OmitType(UserDto, ['firstName', 'lastName', 'email']){}