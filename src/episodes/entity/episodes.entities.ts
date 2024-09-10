import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Podcast } from "src/podcast/entity/podcast.entity";

export type EpisodeDocument = HydratedDocument<Episode>;

@Schema({
    timestamps: true
})
export class Episode{
    @Prop({
        type: mongoose.Types.ObjectId, ref: 'Podcast'
    })
    podcastId: Podcast;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    audioFile: string;

    @Prop({
    })
    image: string;

    @Prop()
    releaseDate: Date;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);