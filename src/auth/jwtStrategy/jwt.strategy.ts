import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: configService.get<string>('IGNORE_EXPIRATION'),
            secretOrKey: configService.get<string>('JWT_CONSTANT'),
          });
    }

    async validate(payload: any){
        return { id: payload.sub, username: payload.username };
    }
}