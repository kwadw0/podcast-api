import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { hashPassword, isMatched } from 'src/utils/hashing';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    try {
      const {
        password
      } = signUpDto;
      const hashedPass = await hashPassword(password);

      const user = await this.userModel.create({
        ...signUpDto,
        password: hashedPass,
        createdAt: Date.now()
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }

  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.findOne(email);
      if (user && user.password) {
        const isPasswordValid = await isMatched(password, user.password);
        if (isPasswordValid) {
          const { password, ...result } = user.toObject();
          return result;
        }
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    console.log(user, payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}