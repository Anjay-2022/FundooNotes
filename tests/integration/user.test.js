import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
let token=''
let resettoken=''
let note_id=''

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
    
    it('Given valid user details should be save in database',  (done) => {
      const inputBody = {
        "firstname": "ramendra",
        "lastname": "atrey",
        "email": "anjaypratap2020@gmail.com",
        "password": "ramendra@123"
      }
      request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        . end( (err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
    
    it('Given invalid firstname, should throw corresponding error', (done) => {
      const inputBody = {
        "firstname": "ram",
        "lastname": "atrey",
        "email": "anjaypratap2020@gmail.com",
        "password": "ramendra@123"
      }
      request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  
  
    it('Given invalid lastname, should throw corresponding error', (done) => {
     const inputBody = {
        "firstname": "ramendra",
        "lastname": "atr",
        "email": "anjaypratap2020@gmail.com",
        "password": "ramendra@123"
      }
      request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
        
    it('Given invalid email, should throw corresponding error', (done) => {
     const inputBody = {
        "firstname": "ramendra",
        "lastname": "atrey",
        "email": "anjaypratap2020@.com",
        "password": "ramendra@123"
      } 
      request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  
    
    it('Given invalid password, should throw corresponding error', (done) => {
      const inputBody = {
        "firstname": "ram",
        "lastname": "atrey",
        "email": "anjaypratap2020@gmail.com",
        "password": "r@123"
      }
        request(app)
        .post('/api/v1/users/registerUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  
  describe('Login valid User', async() => {
    
    it('Given valid user login details should get logged into account', (done) => {
      const inputBody = {
        "email": "anjaypratap2020@gmail.com",
        "password": "ramendra@123"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          token=res.body.data
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
     
    it('Given invalid email, should throw corresponding error', (done) => {
      const inputBody = {
        "email": "anjaypratap2020@.com",
        "password": "ramendra@123"
      }
        request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
    
    it('Given invalid password , should throw corresponding error', (done) => {
      const inputBody = {
        "email": "anjaypratap2020@gmail.com",
        "password": "ramendra@12"
      }
        request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });

    it('Given email to forget credential, should return token', (done) => {
      const inputBody = {
        "email": "anjaypratap2020@gmail.com"
      }
        request(app)
        .post('/api/v1/users/forgetPassword')
        .send(inputBody)
        .end((err, res) => {
          resettoken=res.body.data
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
    
    // it(`Given email to reset credential, should return newtoken`, (done) => {
    //   const inputBody = {
    //     "password": "123456789"
    //   }
    //     request(app)
    //     .post('/api/v1/users/resetPassword')
    //     .set(`authorization`,`Bearer ${resettoken}`) 
    //     .send(inputBody)
    //     .end((err, res) => {
    //       token=res.body.data
    //       console.log(res.body,"=-----=")
    //       expect(res.statusCode).to.be.equal(201);  
    //       done();
    //     });
    // });
  });


	describe('Note Create', () => {
		it('should create note and return note details', (done) => {
			const note = {
				title: "Hi world",
				description: "Hello world"
			};
			request(app)
				.post('/api/v1/notes/add')
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(note)
				.end((err, res) => {
          note_id=res.body.data._id
					expect(res.statusCode).to.be.equal(201);
					expect(res.body).to.be.an('object');
					done();
				});
		});

		it('should create note and return error for title require', (done) => {
			const note = {
				description: "Hello world"
			};
			request(app)
				.post('/api/v1/notes/add')
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
          done();
				});
		});

		it('should create note and return error for title length', (done) => {
			const note = {
				title: "hi",
				description: "Hello world"
			};
			request(app)
				.post('/api/v1/notes/add')
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					done();
				});
		});

		it('should create note and return error for description require', (done) => {
			const note = {
				title: "Hi world"
			};
			request(app)
				.post('/api/v1/notes/add')
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					done();
				});
		});
  });

  describe('Note Retrival', () => {
		it('should Get note and return note details', (done) => {
			request(app)
				.get(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(200);
					done();
				});
		});

    it('Given invalid object_id should give corresponding error', (done) => {
			request(app)
				.get(`/api/v1/notes/ ${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send()
				.end((err, res) => {
  				expect(res.statusCode).to.be.equal(400);
					done();
				});
		});

    it('Given invalid url should give corresponding error', (done) => {
			request(app)
				.get(`/api/v1/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send()
				.end((err, res) => {       
					expect(res.statusCode).to.be.equal(404);
					done();
				});
		});


    it('Given wrong token should give corresponding error', (done) => {
			request(app)
				.get(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${token}${1}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					done();
				});
		});

    it('Given wrong HTTP method should give corresponding error', (done) => {
			request(app)
				.post(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${token}${1}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					done();
				});
		});

    it('Given valid details to get All, should give corresponding error', (done) => {
			request(app)
				.get(`/api/v1/notes/all`)
        .set(`authorization`,`Bearer ${token}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(200);
					done();
				});
		});
    it('Given invalid http method to get All, should give corresponding error', (done) => {
			request(app)
				.post(`/api/v1/notes/all`)
        .set(`authorization`,`Bearer ${token}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					done();
				});
		});
    it('Given invalid token to get All, should give corresponding error', (done) => {
			request(app)
				.get(`/api/v1/notes/all`)
        .set(`authorization`,`Bearer ${token}${2}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					done();
				});
		});
    it('Given invalid url to get All, should give corresponding error', (done) => {
			request(app)
				.get(`/api/v1/notes/all1`)
        .set(`authorization`,`Bearer ${token}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(400);
					done();
				});
		});

  });

  describe('Note update', () => {
		it('should update note and return note details', (done) => {
      const updatenote = {
        title: "Hi Mr Anjay",
        description: "Hello Mr pratap"
      };
			request(app)
				.put(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(updatenote)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(202);
					done();
				});
		});

    it('Given invalid object_id should give corresponding error', (done) => {
      const updatenote = {
        title: "Hi Mr Anjay",
        description: "Hello Mr pratap"
      };
			request(app)
				.put(`/api/v1/notes/ ${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(updatenote)
				.end((err, res) => {
  				expect(res.statusCode).to.be.equal(400);
					done();
				});
		});

    it('Given invalid url should give corresponding error', (done) => {
      const updatenote = {
        title: "Hi Mr Anjay",
        description: "Hello Mr pratap"
      };
			request(app)
				.put(`/api/v1/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(updatenote)
				.end((err, res) => {       
					expect(res.statusCode).to.be.equal(404);
					done();
				});
		});


    it('Given wrong token should give corresponding error', (done) => {
      const updatenote = {
        title: "Hi Mr Anjay",
        description: "Hello Mr pratap"
      };
			request(app)
				.put(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${token}${1}`)
				.send(updatenote)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					done();
				});
		});

    it('Given wrong HTTP method should give corresponding error', (done) => {
			request(app)
				.post(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${token}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					done();
				});
		});

    it('Given invalid title format, should give corresponding error', (done) => {
      const updatenote = {
        title: "Hi",
        description: "Hello Mr pratap"
      };
			request(app)
				.put(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(updatenote)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					done();
				});
		});

    it('NOt given title , should give corresponding error', (done) => {
      const updatenote = {
        description: "Hello Mr pratap"
      };
			request(app)
				.put(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(updatenote)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					done();
				});
		});

    it('NOt given description , should give corresponding error', (done) => {
      const updatenote = {
        title: "Hello Mr pratap"
      };
			request(app)
				.put(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send(updatenote)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					done();
				});
		});

  });


  describe('Note delete', () => {
    it('Given wrong http method,should detele note', (done) => {
			request(app)
				.post(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					done();
				});
		});

    it('Given wrong url,should detele note', (done) => {
			request(app)
				.delete(`/api/v1/notes1/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					done();
				});
		});
    it('Given wrong object_id,should detele note', (done) => {
			request(app)
				.delete(`/api/v1/notes/${note_id}${3}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(400);
					done();
				});
		});
    it('Given wrong token,should detele note', (done) => {
			request(app)
				.delete(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}${1}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					done();
				});
		});

		it('Given all correct details,should detele note', (done) => {
			request(app)
				.delete(`/api/v1/notes/${note_id}`)
        .set(`authorization`,`Bearer ${resettoken}`)
				.send()
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(200);
					done();
				});
		});
  });  
});










//test hook:= before beforeeach after aftereach
//test suits:= describe