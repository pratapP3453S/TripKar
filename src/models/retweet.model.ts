import { Schema, model, models, Document, Model } from "mongoose";

export interface IRetweetTweet extends Document {
    content: string; // Text content of the tweet
    images?: string[]; // Array of image URLs
    video?: string; // URL of the video
    owner: Schema.Types.ObjectId; // User who created the tweet
    likes: Schema.Types.ObjectId[]; // Users who liked the tweet
    retweets: Schema.Types.ObjectId[]; // Users who retweeted the tweet
    originalTweet?: Schema.Types.ObjectId; // Reference to the original tweet (for retweets)
    isRetweet: boolean; // Flag to indicate if this is a retweet
    createdAt: Date;
    updatedAt: Date;
}

const retweetTweetSchema = new Schema<IRetweetTweet>(
    {
        content: {
            type: String,
            trim: true,
        },
        images: [
            {
                type: String, // URL of the image
            },
        ],
        video: {
            type: String, // URL of the video
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        retweets: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        originalTweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet",
        },
        isRetweet: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Retweet: Model<IRetweetTweet> = (models.Retweet as Model<IRetweetTweet>) || model<IRetweetTweet>("Retweet", retweetTweetSchema);