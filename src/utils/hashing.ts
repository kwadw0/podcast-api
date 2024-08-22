import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string>{
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        return hash;
    } catch (error) {
        throw new InternalServerErrorException('Error hashing password', error);
    }

}

export async function isMatched(password: string, hash: string): Promise<boolean>{
    try {
        const matchedPassword = await bcrypt.compare(password, hash);
        return matchedPassword;
    } catch (error) {
        throw new InternalServerErrorException('Error matching password', error);
    }
}