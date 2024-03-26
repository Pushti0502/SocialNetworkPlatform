const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    const testMONGODB_URI =
        'mongodb+srv://pushtishah:SOCIALNETWORK123@cluster0.ruksth1.mongodb.net/?retryWrites=true&w=majority';

    await mongoose.connect(testMONGODB_URI, {});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Create User', () => {
  
    // it('should create a new user', async () => {
    //     const response = await request(app).post('/user/signup').send({
    //         username: 'TestUser',
    //         email: 'pshah2@gmail.com',
    //         password: '12345678',
    //     });
    //     expect(response.status).toBe(201);
    //     expect(response.body.message).toBe('User registered successfully');
    //     expect(response.body).toHaveProperty('token');
    //     expect(response.body).toHaveProperty('user');
    //     expect(response.body.user).toHaveProperty('_id');
       
    // });
    it('missing credentials',async ()=>{
        const response = await request(app)
        .post('/user/signup')
        .send({
          email:"p@gmail.com"
        });

    expect(response.status).toBe(400); 
    expect(response.body).toHaveProperty('errors');
    })
    it('missing credentials',async ()=>{
        const response = await request(app)
        .post('/user/login')
        .send({
          email:"p@gmail.com"
        });

    expect(response.status).toBe(400); 
    expect(response.body).toHaveProperty('errors');
    })
    it('invalid password',async ()=>{
        const response = await request(app)
        .post('/user/login')
        .send({
            email: 'pshah1234@gmail.com',
            password: '1234567897',
        });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid Password' )
    })
    it('invalid email',async ()=>{
        const response = await request(app)
        .post('/user/login')
        .send({
            email: 'test190@gmail.com',
            password: '1234567897',
        });

        expect(response.status).toBe(404); 
        expect(response.body.message).toBe('User not found' )
    })
    it('should log in an existing user', async () => {
        const response = await request(app).post('/user/login').send({
            email: 'pshah1234@gmail.com',
            password: '12345678',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('token');
    });
   
    it('should update a user', async () => {
        const userId='65fc0ab4500014e06eb8b1af'
        const response = await request(app)
            .patch(`/user/${userId}/update`)
            .send({
                username: 'Pushti',
            });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User updated successfully');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user._id).toBe(userId); 
        expect(response.body.user).toHaveProperty('username', 'Pushti');
    });
    it('should update a user which does not exist', async () => {
        const userId='65f9778b4e105b0d975521fb'
        const response = await request(app)
            .patch(`/user/${userId}/update`)
            .send({
                username: 'Pushti',
            });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
       
    });
    it('should follow user',async()=>{
        const id='65fbc05e519f266be3042f7b';
        const userId='65fc0ab4500014e06eb8b1af'
        const response = await request(app)
        .patch(`/user/${id}/follow`).send({
            currentUserId: userId
        })
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User Followed');
        expect(response.body).toHaveProperty('user')
      
      
    })
    it('user is already followed', async()=>{
        const id='65fbc05e519f266be3042f7b';
        const userId='65fc0ab4500014e06eb8b1af'
        const response = await request(app)
        .patch(`/user/${id}/follow`).send({
            currentUserId: userId
        })
        expect(response.status).toBe(403)
        expect(response.body.message).toBe('User is Already followed by you');
    })
    it('should unfollow user',async()=>{
        const id='65fbc05e519f266be3042f7b';
        const userId='65fc0ab4500014e06eb8b1af'
        const response=await request(app)
        .patch(`/user/${id}/unfollow`).send({
            currentUserId: userId
        })
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('User Unfollowed')
        expect(response.body).toHaveProperty('user')
     
    })
   it('unfollow user which is not followed',async()=>{
     const id="65fbc05e519f266be3042f7b";
     const userId='65fc0ab4500014e06eb8b1af'
     const response=await request(app)
      .patch(`/user/${id}/unfollow`).send({
        currentUserId: userId
      })
      expect(response.status).toBe(404)
      expect(response.body.message).toBe('User is not followed by you')
   })
   it('current user and userid to follow/unfollow is same', async()=>{
    const id="65fc0ab4500014e06eb8b1af";
    const userId="65fc0ab4500014e06eb8b1af"
    const response = await request(app)
    .patch(`/user/${id}/unfollow`).send({
        currentUserId: userId
      })
      expect(response.status).toBe(403)
      expect(response.body.message).toBe('Action forbidden')
   })
   it('get all users',async()=>{
    const response = await request(app)
     .get(`/user/getusers`)

     expect(response.status).toBe(200)
     expect(response.body.message).toBe('Users fetched successfully')
     expect(response.body).toHaveProperty('user')
   })
   it('get data of particular user',async()=>{
    const id='65fbde9275040c3a2e023afb'
    const response = await request(app)
    .get(`/user/${id}/getuserbyid`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Fetch User Success!!')
   })
   it('get data of particular user that does not exist',async()=>{
    const id='65f9778b4e105b0d975521fb'
    const response = await request(app)
    .get(`/user/${id}/getuserbyid`)

    expect(response.status).toBe(404)
    expect(response.body.message).toBe("User Not Found")
   })
});
