import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose } from "mongoose";
import { User } from "src/users/entity/users.entity";


export type UserDocument = HydratedDocument<Podcast>;
@Schema({
    timestamps: true
})
export class Podcast {
    @Prop({})
    title: string;

    @Prop({})
    description: string;

    @Prop({})
    category: string;

    @Prop({})
    coverImage: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({})
    tags: string[];

}

export const PodcastSchema = SchemaFactory.createForClass(Podcast);