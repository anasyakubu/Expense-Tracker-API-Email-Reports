import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/User"


const userSchema: Schema = new Schema(
  {
    uid: { type: String },
    name: { type: String, require: true },
    username: { type: String },
    email: { type: String, require: true, unique: true },
    phone: { type: String },
    password: { type: String, require: true },
    resetToken: { type: String, },
    resetTokenExpiry: { type: Date, },
    address: { type: String, },
    photoURL: { type: String },
    verified: { type: Boolean }, isPremium: { type: Boolean },
    walletBalance: { type: Number, default: 0 },
    walletRefBalance: { type: Number, default: 0 },
    refID: { type: String, unique: true }, // for sharing
    referredBy: { type: String },          // who referred this user
    totalReferralPoints: { type: Number, default: 0 },
    referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    referralRewardsClaimed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create the model
const User = mongoose.model<IUser>("Users", userSchema);

export default User;