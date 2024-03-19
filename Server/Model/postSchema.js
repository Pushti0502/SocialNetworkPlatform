const mongoose = require('mongoose');
const { z } = require('zod');
const post = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    createdBy: z.string().optional(),

    selectedFile: z.string().optional(),
    likes: z.array(z.string()).optional(),
    comments: z.array(z.string()).optional(),
    createdAt: z.date(),
});

const postSchema = mongoose.Schema({
    title: {
        type: String,
       
    },
    content: {
        type: String,
       
    },
    createdBy: {
        type: String,
    },

    selectedFile: {
        type: String,
    },
    likes: {
        type: [],
        default: [],
    },
    comments: {
        type: [],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
postSchema.pre('save', async function () {
    try {
        post.parse(this.toObject());
    } catch (error) {
        console.log(error);
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
