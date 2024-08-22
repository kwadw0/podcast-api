import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseEntity } from "src/shared/baseEntity/base.entity";


export type UserDocument = HydratedDocument<User>
@Schema()
export class User extends BaseEntity{
    [x: string]: any;
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    bio: string;

    @Prop()
    profilePicture: string;
    
    @Prop({
        
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);