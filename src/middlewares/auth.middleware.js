import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

let key = process.env.key

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user  = await jwt.verify(bearerToken, key);
    req.body.email=user.email    
    next(); 
  } catch (error) {
    next(error);
  }
};


export const resetuserAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user  = await jwt.verify(bearerToken, key);
    req.body.email=user.email    
    next(); 
  } catch (error) {
    next(error);
  }
};
