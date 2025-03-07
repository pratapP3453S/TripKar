import mongoose, { Document, model, Model, models, Schema } from "mongoose";


export interface ITweet extends Document {
    content: string;
    images?: string[];
    videos?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const TweetSchema = new Schema<ITweet>({
    content: {
        type: String,
        required: true,
    },
    images: {
        type: String,
    },
    videos: {
        type: String,
    },
}, { timestamps: true })

export const Tweet: Model<ITweet> = (models.Tweet as Model<ITweet>) || (model<ITweet>("Tweet", TweetSchema));