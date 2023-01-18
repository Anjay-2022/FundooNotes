import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import {  resetuserAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/registerUser', newUserValidator, userController.registerUser);

router.post('/login', userController.loginUser);

router.post('/forgetPassword', userController.sendmailToResetPass);

router.put('/resetPassword',resetuserAuth, userController.resetPassword);

export default router;
