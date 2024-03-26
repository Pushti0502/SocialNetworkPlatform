const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Post = require('../Model/postSchema');
const {User}= require('../Model/userSchema')


beforeAll(async () => {
    const testMONGODB_URI =
        'mongodb+srv://pushtishah:SOCIALNETWORK123@cluster0.ruksth1.mongodb.net/?retryWrites=true&w=majority';

    await mongoose.connect(testMONGODB_URI, {});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Post API', () => {
 

    it('should create new post', async () => {
        const userId = '65f9778b4e105b0d975521fb';
        const response = await request(app).post('/post/createPost').send({
            title: 'Hello123',
            content: 'Hello User',
            createdBy: userId,
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Post Created!!');
        expect(response.body).toHaveProperty('post');
        expect(response.body.post).toHaveProperty('_id');
    
    });
    it('should get post', async () => {
        const userId = '65f9778b4e105b0d975521fb';
        const response = await request(app).get(`/post/${userId}/getPostById`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Post Get Successfully!!');
        expect(response.body).toHaveProperty('posts');
    }, 5000);
    it('should update post', async () => {
        const postId = '65f9851873d87bc9eebfec0f';
        const response = await request(app)
            .patch(`/post/${postId}/updatePost`)
            .send({
                title: 'Hbd Pushti',
            });
        expect(response.status).toBe(200);
        expect(response.body.post._id).toBe(postId);
        expect(response.body.post).toHaveProperty('title', 'Hbd Pushti');
        expect(response.body.message).toBe('Post Updated Successfully');
        expect(response.body).toHaveProperty('post');
    });
    // it('should delete post',async()=>{
    //     const postId="65f9856819e2757a244a3fe4";
    //     const response= await request(app).delete(`/post/${postId}/deletePost`)
    //     expect(response.status).toBe(200);
    //     expect(response.body.deletedPost._id).toBe(postId)
    //     expect(response.body.message).toBe('Post deleted successfully')
    // })
    it('should like Post', async () => {
        const postId = '65f990bfdb4649a8262ee90c';
        const userId = '65f9778b4e105b0d975521fb';
        const response = await request(app).patch(
            `/post/${userId}/likePost/${postId}`
        );
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Post Liked Successfully');
        expect(response.body).toHaveProperty('post');
        expect(response.body.post._id).toBe(postId);
    });
    it('should unlike Post', async () => {
        const postId = '65f990bfdb4649a8262ee90c';
        const userId = '65f9778b4e105b0d975521fb';

        const response = await request(app)
            .patch(`/post/${userId}/likePost/${postId}`)
            
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Post UnLiked Successfully');
        expect(response.body).toHaveProperty('post');
        expect(response.body.post._id).toBe(postId);

        const post = await Post.findById(postId);
        const likedPostIndex = post.likes.indexOf(userId);
        expect(likedPostIndex).toBe(-1);
    });
    it('should comment Post', async()=>{
        const postId = '65f990bfdb4649a8262ee90c';
        const comment = "Very Nice Post";
        const response = await request(app)
        .patch(`/post/${postId}/commentPost`).send({
            comment
        })
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Comment added successfully')
        expect(response.body).toHaveProperty('post')
        expect(response.body.post.comments).toContain(comment)
       
    })
    it('should get the comments',async()=>{
        const postId= '65f990bfdb4649a8262ee90c';
        const response = await request(app)
        .get(`/post/${postId}/getComments`)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Comments fetched successfully')
        expect(response.body).toHaveProperty('comments')
        
    })
    it('should save a post', async () => {
      const postId='65fa6d0bafed401cc9159fa7';
      const userId = '65f9778b4e105b0d975521fb';
      const response = await request(app)
        .patch(`/user/${userId}/saveunsavepost/${postId}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('user')
      expect(response.body.user._id).toBe(userId)
     
    });
    it('should unsave a post ',async()=>{
        const postId='65fa6d0bafed401cc9159fa7';
        const userId = '65f9778b4e105b0d975521fb';
        const response = await request(app)
          .patch(`/user/${userId}/saveunsavepost/${postId}`)
          expect(response.status).toBe(200)
          expect(response.body).toHaveProperty('user')
          expect(response.body.user._id).toBe(userId)
          const user = await User.findById(userId);
        const postIndex = user.savedposts.indexOf(postId)
        expect(postIndex).toBe(-1);
    })
});
