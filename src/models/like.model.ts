import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITweet extends Document {
    content: string; // Text content of the tweet
    images?: string[]; // Array of image URLs
    videos?: string[]; // Array of video URLs
    owner: Schema.Types.ObjectId; // User who created the tweet
    likes: Schema.Types.ObjectId[]; // Users who liked the tweet
    retweets: Schema.Types.ObjectId[]; // Users who retweeted the tweet
    originalTweet?: Schema.Types.ObjectId; // Reference to the original tweet (for retweets)
    isRetweet: boolean; // Flag to indicate if this is a retweet
    createdAt: Date;
    updatedAt: Date;
}

const tweetSchema = new Schema<ITweet>(
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
        videos: [
            {
                type: String, // URL of the video
            },
        ],
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

export const Tweet: Model<ITweet> = (mongoose.models.Tweet as Model<ITweet>) || mongoose.model<ITweet>("Tweet", tweetSchema);