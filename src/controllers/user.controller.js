import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);
    console.log(data)
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Login successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const registerUser = async (req, res, next) => {
  try {
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

