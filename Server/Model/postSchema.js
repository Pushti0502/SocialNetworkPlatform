const mongoose =require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   
    },
    tags: {
        type: [String],
        default: [],
    },
    selectedFile: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String], 
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    
});

const Post = mongoose.model('Post', postSchema);

module.exports =Post