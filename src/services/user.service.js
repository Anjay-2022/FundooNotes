import User from '../models/user.model';
import bcrypt from 'bcrypt';

//Login users
export const loginUser = async (body) => {
  const data = await User.findOne({email:body.email});
  if (data != null){
    await bcrypt.compare(body.password,data.password)
    .then(function(result){
      if(!result)
      throw new error ("invalid credential")
    } )
      return data
 } else
      throw new Error("Login unsuccesfull")
};

//create new user
export const newUser = async (body) => {
  const saltrounds= await bcrypt.genSalt(10);
  const hashedpwd = await bcrypt.hash(body.password,saltrounds)
  body.password=hashedpwd
  const data = await User.create(body);
  return data;
};