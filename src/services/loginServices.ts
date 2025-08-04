import User from "../models/user.model";
import { IUser } from "../types/User";
import { comparePassword } from "../utils/helpers/auth";
import jwt from 'jsonwebtoken';

class LoginUser {
  // private email: string;
  // private password: string;

  constructor(
    public username: string, public email: string, public phone: string, public password: string,
  ) {
    this.username = username; this.email = email; this.phone = phone; this.password = password;
  }


  public async login(): Promise<any> {

    // console.log("constructor values:", this.email, this.password);

    try {

      //******************** Check if user exists by email, username or phone ********************//

      const user: IUser | null = await User.findOne({
        $or: [{ email: this.email }, { username: this.username }, { phone: this.phone }]
      });

      // console.log(user); // for debugging (1)

      if (!user) { return { status: false, msg: "No User Found" }; }


      // Compare passwords
      const match = await comparePassword(this.password, user.password);

      // console.log(match); // for debugging (2)

      if (!match) { return { status: false, msg: "Invalid Password" }; }

      // Generate JWT token
      const token = jwt.sign(
        { email: user.email, _id: user._id, userID: user.userID, },
        process.env.JWT_SECRET as string,

        { expiresIn: "5h" } // Fixed "5hr" to standard "5h"
      );

      // console.log(token); // for debugging (3)

      const login = {
        status: true, msg: "User logged in successfully!", token: token, userID: user._id,
        // user // Optional: you might want to return some user data
      };

      return login;

    } catch (error: any) {
      console.error("Error logging user:", error.message);
      throw error;
    }
  }
}

export default LoginUser;