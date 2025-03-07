import bcrypt from "bcryptjs";
import mongoose, { Schema, Document, Model } from "mongoose";
import { string } from "zod";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    resetPasswordToken?: string; 
    resetPasswordExpiry?: Date; 
    verifyCode?: string; 
    verifyCodeExpiry?: Date; 
    isVerified: boolean;
    isAdmin: boolean;
    avatar: string;
    coverImage: string;
    about: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required."],
            trim: true,
            unique: true,
            index: true, 
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, 'Please use a valid email id.'],
            index: true, 
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpiry: {
            type: Date,
        },
        verifyCode: {
            type: String,
            required: [true, "Verify code is required."],        
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "Verify expiry is required."],        
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
        },
        coverImage: {
            type: String,
        },
        about: {
            type: String,
        }
    },
    {
        timestamps: true, 
    }
);

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

UserSchema.pre<IUser>("save", async function (next) {
    if(!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        next(error as Error);
    }
})

const User: Model<IUser> = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default User;