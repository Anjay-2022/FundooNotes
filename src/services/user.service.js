import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { forgetemail } from '../utils/user.util';
import { sender } from '../config/rabbitmq';
dotenv.config();

let key = process.env.key

//Login users
export const loginUser = async (body) => {
    let token;
    const data = await User.findOne({ email: body.email });
    if (data) {
      await bcrypt.compare(body.password, data.password)
        .then(function (result) {
          if (!result) {
            throw new Error("invalid credential")
          } else {
            token = jwt.sign({ email: data.email, id: data._id }, key);
          }
        })
      sender(body)  
      return token
    } else
      throw new Error("User is not registered.")
};


//register new user
export const registerUser = async (body) => {
  const existingUser = await User.findOne({ email: body.email });
  if(existingUser){
    throw new Error ("User already register with this email!")
  } else{
  const saltrounds = await bcrypt.genSalt(10);
    const hashedpwd = await bcrypt.hash(body.password, saltrounds)
    body.password = hashedpwd
    const data = await User.create(body);
    sender(data)
    return data;
  }
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