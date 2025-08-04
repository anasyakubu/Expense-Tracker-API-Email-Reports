import mongoose from "mongoose";


export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  userID: mongoose.Types.ObjectId;
  uid: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  resetToken: string;
  resetTokenExpiry: string;
  address: string;
  photoURL: string;
  verified: boolean;
  walletBalance: number;
  walletRefBalance: number;
  refID: string;
  referredBy: string;
  referrals: mongoose.Types.ObjectId[];
  referralRewardsClaimed: boolean;
  createdAt?: Date; updatedAt?: Date;
}