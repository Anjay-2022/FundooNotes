import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
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
          throw new error("invalid credential")
        } else {
          token = jwt.sign({ email: data.email, id:data._id }, key);
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