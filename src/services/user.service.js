import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { forgetemail } from '../utils/user.util';
dotenv.config();

let key = process.env.key

//Login users
export const loginUser = async (body) => {
    let token;
    const data = await User.findOne({ email: body.email });
    if (data != null) {
      await bcrypt.compare(body.password, data.password)
        .then(function (result) {
          if (!result) {
            throw new Error("invalid credential")
          } else {
            token = jwt.sign({ email: data.email, id: data._id }, key);
          }
        })
      return token
    } else
      throw new Error("Login unsuccesfull")
};


//register new user
export const registerUser = async (body) => {
    const saltrounds = await bcrypt.genSalt(10);
    const hashedpwd = await bcrypt.hash(body.password, saltrounds)
    body.password = hashedpwd
    const data = await User.create(body);
    return data;
};


export const sendmailtoresetpass = async (body) => {
    const data = await User.findOne({ email: body.email });
    if (data != null) {
      const token = jwt.sign({ email: data.email, id: data._id }, key,
        { expiresIn: '10m' });
      const details = await forgetemail(data.email, token)
      return details
    } else
      throw new Error("User not register.First sign in")
}

export const resetPassword = async (body) => {
    const data = await User.findOne({ email: body.email });
    if (data != null) {
      const saltrounds = await bcrypt.genSalt(10);
      const hashedpwd = await bcrypt.hash(body.password, saltrounds)
      const updatedUser = await User.updateOne(
        { _id: data._id }, { $set: { password: hashedpwd } })
      return updatedUser;
    } else
      throw new Error("User not register.First sign in")
}