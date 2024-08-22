import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class SignUpDto {
    @ApiProperty({
        description:'Users firstname',
        type: String
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description:'Lastname',
        type: String
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description:'email',
        type: String
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description:'phone number',
        type: String
    })
    @IsOptional()
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({
        description:'username',
        type: String
    })
    @IsString()
    username: string;


    @ApiProperty({
        description:'password',
        type: String
    })
    @IsString()
    password: string;
}