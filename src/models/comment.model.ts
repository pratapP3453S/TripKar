import { Schema, model, models, Document, Model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define the IComment interface
export interface IComment extends Document {
    content: string;
    video: Schema.Types.ObjectId;
    image: Schema.Types.ObjectId;
    owner: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
    {
        content: {
            type: String,
            required: true,
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: "Image"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true } 
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment: Model<IComment> = (models.Comment as Model<IComment>) || model<IComment>("Comment", commentSchema);