import { IUser } from './../types/User';
import User from "../models/user.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/helpers/auth"
import crypto from "crypto";
import sendResetToken from "../services/sendResetToken";
import Users from '../services/Users';
import LoginUser from '../services/loginServices';


// ******************** LIST ALL USERS  ********************//
const listAllUsers = async (req: Request, res: Response): Promise<void> => {

  try {

    const users = await Users.listAll()

    //*********** return response ***********//
    res.status(201).json(users);

  } catch (error: any) {
    console.error("ERROR : ", error)
    res.status(500).json({ status: false, msg: error.message, error: error })
  }
}

// ******************** GET USERS BY ID  ********************//
const getUsersByID = async (req: Request, res: Response): Promise<void> => {

  try {

    const id: string = req.params.id;

    const users = await Users.getByID(id); // ✅ now works as it's static

    res.status(200).json(users); // 200 is better than 201 here

  } catch (error: any) {
    console.error("ERROR:", error);
    res.status(500).json({ status: false, msg: error.message });
  }
};

// ******************** REGISTER USER  ********************//
const registerUser = async (req: Request, res: Response): Promise<void> => {

  try {

    const { name, username, email, phone, password, referredBy } = req.body ? req.body : {};


    //*********** check for missing fields ***********//
    const checkMissingFields = (fields: any) => {
      for (const [key, value] of Object.entries(fields)) {
        if (!value) { return key; }
      }
      return null; // All fields are valid
    };

    const fieldsToCheck = { name, username, email, password };
    const missingField = checkMissingFields(fieldsToCheck);

    if (missingField) {
      res.status(400).json({ status: false, msg: `${missingField} is required` });
      return
    }


    //*********** check if password is good ***********//
    if (!password || password.length < 4) {
      res.status(400).json({
        status: false, msg:
          "Password is required and it should be 4 characters long",
      });
      return
    }

    //*********** check email exist ***********//
    const exist = await User.findOne({ email });
    if (exist) { res.status(400).json({ status: false, msg: "Email already taken", }); }

    const result = new Users(name, username, email, phone, password, referredBy)

    const user = result.save();

    //*********** return response ***********//
    res.status(201).json({ status: true, msg: "User Registered Successful", data: user });


  } catch (error: any) {
    console.error("ERROR : ", error)
    res.status(500).json({ status: false, msg: error.message, error: error })
  }
}

// ******************** LOGIN  ********************//
const login = async (req: Request, res: Response): Promise<void> => {

  try {

    const { email, password, username, phone } = req.body ? req.body : {};

    const result = new LoginUser(username, email, phone, password)

    const login = await result.login()

    res.status(200).json(login);

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, msg: "Internal Server Error", error: error });
  }

}

// ******************** UPDATE USER  ********************//
const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userID = req.user?._id;
    const { id } = req.params;
    const { name, email, phone, username, address } = req.body ? req.body : {};

    if ([name, email, username, phone, address].some(field => !field)) {
      res.status(400).json({ status: false, msg: "All fields are required" });
      return; // Just return without value
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, username, phone, address },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ status: false, msg: "User not found" });
      return; // Just return without value
    }

    res.json({ status: true, msg: "User Updated Successfully", data: updatedUser });
  } catch (error: any) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};



//********************** Forget password functionality **********************//
const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    //************ check for user exist ************//
    const user = await User.findOne({ email: email });
    if (!user) { res.status(404).json({ status: 404, message: 'User not found' }); }

    //************  Generate reset token ************ //

    const resetToken = crypto.randomBytes(32).toString('hex');
    await User.findOneAndUpdate(
      { email },
      { resetToken, resetTokenExpiry: Date.now() + 3600000 },
      { new: true } // Returns the updated document
    );

    //************ Send email ************//
    await sendResetToken(resetToken, email);

    res.status(200).json({ statu: true, msg: 'Password reset email sent' });
  } catch (error) {
    console.error("Forget Pass:", error);
    res.status(500).json({ status: false, msg: "Internal Server Error", error });
  }
}

//********************** Reset password functionality **********************//
const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;
  const { password } = req.body ? req.body : {};
  try {

    //************ check for valid token ************//
    const user: IUser | any = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() } // ✅ Mongoose uses `$gt`
    });

    if (!user) { res.status(400).send({ status: false, msg: 'Invalid or expired token' }); }

    //************ hashed password to db ************//
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    // ************ Update User Password ************//
    await user.save();

    res.status(200).json({ status: true, message: 'Password reset successful' });

  } catch (error: any) {
    console.log("ERROR", error);
    res.status(500).json({ status: false, msg: "Internal Server Error", error });
  }
}


// ******************** DEACTIVITATE USER  ********************//
const deactiviateUser = async (req: Request, res: Response): Promise<void> => { }

export {
  listAllUsers, getUsersByID, registerUser, login, updateUser, forgetPassword, resetPassword,
  deactiviateUser
}