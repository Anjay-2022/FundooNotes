import User from '../models/user.model';


//Login users
export const loginUser = async (body) => {
  const data = await User.findOne({email:body.email});
  if (data != null){
   if(body.password==data.password)
      return data
    else
     throw new Error("Invalid Credential")
 } else
      throw new Error("Login unsuccesfull")
};


//register new user
export const registerUser = async (body) => {
  const data = await User.create(body);
  return data;
};
