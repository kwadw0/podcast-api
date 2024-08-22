import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entity/users.entity';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            if(!user){
                throw new NotFoundException('User not found.')
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async findAll(): Promise<User[]>{
        try {
            const users = await this.userModel.find().select('-password').exec();;
            return users;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>{
        try {
            const updateUser = await this.userModel.findByIdAndUpdate(id, {...updateUserDto, updatedAt: Date.now()}).select('-password').exec();
            if (!updateUser) {
                throw new NotFoundException(); 
            }
            return updateUser;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }


    async findUserById(id: string): Promise<User>{
        try {
            const user = await this.userModel.findById({_id: id}).select('-password').exec();
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async removeUserById(id: string): Promise<User>{
        try {
            const user = await this.userModel.findByIdAndDelete(
                id,
            ).select('-password').exec();
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

}
