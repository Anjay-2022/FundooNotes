import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

   describe('Register valid User',  () => {
    const inputBody = {
      "firstname": "ramendra",
      "lastname": "atrey",
      "email": "anjaypratap2020@gmail.com",
      "password": "ramendra@123"
    }
    it('Given user details should be save in database',  (done) => {
       request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        . end( (err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  describe('Register invalid firstname', () => {
    const inputBody = {
      "firstname": "ram",
      "lastname": "atrey",
      "email": "anjaypratap2020@gmail.com",
      "password": "ramendra@123"
    }
    it('Given invalid user details should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  
  describe('Register invalid lastname', () => {
    const inputBody = {
      "firstname": "ramendra",
      "lastname": "atr",
      "email": "anjaypratap2020@gmail.com",
      "password": "ramendra@123"
    }
    it('Given invalid user details should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  describe('Register invalid email', () => {
    const inputBody = {
      "firstname": "ramendra",
      "lastname": "atrey",
      "email": "anjaypratap2020@.com",
      "password": "ramendra@123"
    }
    it('Given invalid user details should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  describe('Register invalid password', () => {
    const inputBody = {
      "firstname": "ram",
      "lastname": "atrey",
      "email": "anjaypratap2020@gmail.com",
      "password": "r@123"
    }
    it('Given invalid user details should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  
  describe('Login valid User', () => {
    const inputBody = {
      "email": "anjaypratap2020@gmail.com",
      "password": "ramendra@123"
    }
    it('Given valid user login details should get logged into account', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('Login invalid email', () => {
    const inputBody = {
      "email": "anjaypratap2020@.com",
      "password": "ramendra@123"
    }
    it('Given invalid user login details should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  describe('Login invalid password', () => {
    const inputBody = {
      "email": "anjaypratap2020@gmail.com",
      "password": "ramendra@12"
    }
    it('Given invalid user login details should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
  
});










//test hook:= before beforeeach after aftereach
//test suits:= describe