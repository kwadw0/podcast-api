import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private authservice: AuthService,
    ){
        super({ usernameField: 'email' });
    }


    async validate(email: string, password: string){
        try {
            const validatedUser = await this.authservice.validateUser(email, password);
            if (!validatedUser) {
                throw new UnauthorizedException('Invalid Credentials');
            }
            return validatedUser;
        } catch (error) {
            console.log(error);
            if (error.status === 404) {
                throw new NotFoundException('User not found.');
            }
            if (error.status === 401) {
                throw new UnauthorizedException('Invalid Credentials.');
            }
            throw new InternalServerErrorException();
        }
    }
}