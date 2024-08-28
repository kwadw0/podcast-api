import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description:'email',
        type: String
    })
    @IsEmail()
    email: string;

    @ApiProperty({ 
        description:'password',
        type: String
    })
    @IsString()
    password: string;
}