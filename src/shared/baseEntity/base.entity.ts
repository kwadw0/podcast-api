import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class BaseEntity {
    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    deletedAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}