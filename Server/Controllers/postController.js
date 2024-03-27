const Post = require('../Model/postSchema.js');
const { User } = require('../Model/userSchema.js');
const { z } = require('zod');
const multer = require('multer');

const createPostSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    selectedFile: z.array(z.string()).optional(),
    createdBy: z.string().optional(),
    createdAt: z.date().optional(),
    comments: z.array(z.string()).optional(),
});
const updatePostSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    selectedFile: z.array(z.string()).optional(),
    comments: z.array(z.string()).optional(),
});

const idSchema = z.object({
    id: z.string(),
});
const userIdSchema = z.object({
    userId: z.string(),
});
const commentPostSchema = z.object({
    comment: z.string(),
    id: z.string(),
});

const imageUpload = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    });

    const upload = multer({ storage: storage });
    return upload;
};

const createPost = async (req, res) => {
    try {
        const { title, content, comments, createdBy, likes } =
            createPostSchema.parse(req.body);
            let selectedfile=''
            if (req.file && req.file.path) {
                selectedfile = req.file.path;
            }
        const post = new Post({ 
            title,
            content,
            selectedFile:selectedfile,
            comments,
            likes,
            createdBy,
            createdAt: new Date().toDateString(),
        });
     
        await post.save();
       
        return res.status(200).json({ message: 'Post Created!!', post });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: 'Validation errror' });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};

const getPosts = async (req, res) => {
    try {
        const Posts = await Post.find();
        res.status(200).json({ message: 'Post Fetched Succcessfully', Posts });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const getPostById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const followedUserIds = [userId, ...user.following];

        const posts = await Post.find({ createdBy: { $in: followedUserIds } });

       

        res.status(200).json({message:"Post Get Successfully!!",posts});
    } catch (error) {
        res.status(500).json({
            message: 'Internal server Error ',
            error: error.message,
        });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;

    const updatedFields = req.body;
    try {
        updatePostSchema.parse(updatedFields);
        idSchema.parse({ id });
        const  post = await Post.findByIdAndUpdate(id, updatedFields, {
            new: true,
        });

        if (!post) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json({
            message: 'Post Updated Successfully',
            post,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation errror' });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        idSchema.parse({ id });
        const deletedPost = await Post.findOneAndDelete({ _id: id });
        if (!deletedPost) {
            return res.status(400).json({ message: 'Post not Found' });
        }
        return res.status(200).send({ message: 'Post deleted successfully',deletedPost });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: 'Validation errror' });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};

const commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
        commentPostSchema.parse({ id, comment });
        const post = await Post.findByIdAndUpdate(
            id,
            { $push: { comments: comment } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Comment added successfully', post });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: 'Validation errror' });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};

const getComments = async (req, res) => {
    const { id } = req.params;
    try {
        idSchema.parse({ id });
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const comments = post.comments;
        res.status(200).json({
            message: 'Comments fetched successfully',
            comments,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: 'Validation errror' });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};

const likePost = async (req, res) => {
    const { id, userId } = req.params;
    try {
        idSchema.parse({ id });
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const likedPostindex = post.likes.indexOf(userId);
        if (likedPostindex === -1) {
            post.likes.push(userId);
            await post.save();

            res.status(200).json({ message: 'Post Liked Successfully', post });
        } else {
            post.likes.splice(likedPostindex, 1);
            await post.save();

            res.status(200).json({
                message: 'Post UnLiked Successfully',
                post,
            });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.errors });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    imageUpload,
    likePost,
    commentPost,
    getComments,
};
