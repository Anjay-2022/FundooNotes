// import { expect } from 'chai';
// import * as UserService from '../../src/services/user.service';
// import mongoose from 'mongoose';
// import app from '../../src/index';
// import request from 'supertest';

// import dotenv from 'dotenv';
// dotenv.config();
// let token=''
// let resettoken=''

// describe('USER REGISTRATION MODULE TESTING', () => {
//   before((done) => {
//     const clearCollections = () => {
//       for (const collection in mongoose.connection.collections) {
//         mongoose.connection.collections[collection].deleteOne(() => { });
//       }
//     };

//     const mongooseConnect = async () => {
//       await mongoose.connect(process.env.DATABASE_TEST);
//       clearCollections();
//     };

//     if (mongoose.connection.readyState === 0) {
//       mongooseConnect();
//     } else {
//       clearCollections();
//     }

//     done();
//   });

//   describe('Register valid User', () => {

//     it('Given valid user details should be save in database', (done) => {
//       const inputBody = {
//         "firstname": "ramendra",
//         "lastname": "atrey",
//         "email": "anjaypratap2021@gmail.com",
//         "password": "ramendra@123"
//       }
//       request(app)
//         .post('/api/v1/users/registerUser')
//         .send(inputBody)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(201);
//           done();
//         });
//     });

//     it('Given invalid firstname, should throw corresponding error', (done) => {
//       const inputBody = {
//         "firstname": "ram",
//         "lastname": "atrey",
//         "email": "anjaypratap2021@gmail.com",
//         "password": "ramendra@123"
//       }
//       request(app)
//         .post('/api/v1/users/registerUser')
//         .send(inputBody)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(500);
//           done();
//         });
//     });


//     it('Given invalid lastname, should throw corresponding error', (done) => {
//       const inputBody = {
//         "firstname": "ramendra",
//         "lastname": "atr",
//         "email": "anjaypratap2021@gmail.com",
//         "password": "ramendra@123"
//       }
//       request(app)
//         .post('/api/v1/users/registerUser')
//         .send(inputBody)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(500);
//           done();
//         });
//     });

//     it('Given invalid email, should throw corresponding error', (done) => {
//       const inputBody = {
//         "firstname": "ramendra",
//         "lastname": "atrey",
//         "email": "anjaypratap2021@.com",
//         "password": "ramendra@123"
//       }
//       request(app)
//         .post('/api/v1/users/registerUser')
//         .send(inputBody)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(500);
//           done();
//         });
//     });


//     it('Given invalid password, should throw corresponding error', (done) => {
//       const inputBody = {
//         "firstname": "ram",
//         "lastname": "atrey",
//         "email": "anjaypratap2021@gmail.com",
//         "password": "r@123"
//       }
//       request(app)
//         .post('/api/v1/users/registerUser')
//         .send(inputBody)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(500);
//           done();
//         });
//     });
//   });

//   describe('Login valid User', async () => {

//     it('Given valid user login details should get logged into account', (done) => {
//       const inputBody = {
//         "email": "anjaypratap2021@gmail.com",
//         "password": "ramendra@123"
//       }
//       request(app)
//         .post('/api/v1/users/login')
//         .send(inputBody)
//         .end((err, res) => {
//           token = res.body.data
//           expect(res.statusCode).to.be.equal(200);
//           done();
//         });
//     });

//     it('Given invalid email, should throw corresponding error', (done) => {
//       const inputBody = {
//         "email": "anjaypratap2021@.com",
//         "password": "ramendra@123"
//       }
//       request(app)
//         .post('/api/v1/users/login')
//         .send(inputBody)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(400);
//           done();
//         });
//     });

//     it('Given invalid password , should throw corresponding error', (done) => {
//       const inputBody = {
//         "email": "anjaypratap2021@gmail.com",
//         "password": "ramendra@12"
//       }
//       request(app)
//         .post('/api/v1/users/login')
//         .send(inputBody)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(400);
//           done();
//         });
//     });

//     it('Given email to forget credential, should return token', (done) => {
//       const inputBody = {
//         "email": "anjaypratap2021@gmail.com"
//       }
//       request(app)
//         .post('/api/v1/users/forgetPassword')
//         .send(inputBody)
//         .end((err, res) => {
//           resettoken = res.body.data
//           expect(res.statusCode).to.be.equal(201);
//           done();
//         });
//     });
//   });
// });