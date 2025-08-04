import User from "../models/user.model";
import { hashPassword } from "../utils/helpers/auth";
import capitalize from "../utils/helpers/capitalize";
// import generateRefID from "../utils/helpers/generateRefID";

const DEFAULT_USER_IMAGE = "https://res.cloudinary.com/do52dpekr/image/upload/v1739627719/user-1_ml1nrp.jpg";

class Users {
  private user: any;
  private photoURL: string;
  private id?: string;

  constructor(
    public name: string, public username: string, public email: string,
    public phone: string, public password: string, public referredBy: string, id?: string,
  ) {
    this.photoURL = DEFAULT_USER_IMAGE;

    this.user = new User({
      name: capitalize(name), username, email, phone,
      password: '', referredBy, photoURL: this.photoURL,
      verified: false, isPremium: false, refID: null
    });
  }

  private async initialize(): Promise<void> {
    const hPassword = await hashPassword(this.password);
    this.user.password = hPassword;
  }



  public async save(): Promise<any> {
    try {
      await this.initialize(); // Hash password
      const savedUser = await this.user.save(); // Save user

      // Handle referral logic
      if (this.referredBy) {
        const referrer = await User.findOne({ refID: this.referredBy });
        if (referrer) {
          referrer.referrals.push(savedUser._id);
          await referrer.save();
        }
      }

      return savedUser;
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  }

  static async listAll(): Promise<any> {
    try {
      const getUsers = await User.find({});
      if (!getUsers || getUsers.length === 0) {
        return { status: false, msg: "Users not found", data: [] };
      } else {
        return { status: true, msg: "Users fetched successfully", data: getUsers };
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getByID(id: string): Promise<any> {
    try {
      const user = await User.findById(id); // ✅ Better than find({ id })
      if (!user) {
        return { status: false, msg: "User not found", data: null };
      }
      return { status: true, msg: "User fetched successfully", data: user };
    } catch (error: any) {
      console.error("Error fetching user:", error.message);
      throw error;
    }
  }
}

export default Users;