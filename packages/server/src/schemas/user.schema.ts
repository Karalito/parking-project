import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Role} from "../shared/enums/auth.enum";

@Schema({timestamps: true})
export class User {
    @Prop({type: mongoose.Schema.Types.ObjectId})
    _id: string;

    @Prop({required: true})
    fullName: string;

    @Prop({required: true})
    email: string;

    @Prop()
    avatar: string;

    @Prop({required: true, default: Role.USER})
    role: Role;

    @Prop({required: true})
    providerId: string;

    @Prop()
    accessToken: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
