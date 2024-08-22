import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from 'src/users/entity/users.entity';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('User Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async userLogin(@Body() loginDto: LoginDto, @Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('signUp')
    async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
        return await this.authService.signUp(signUpDto);
    }


}
