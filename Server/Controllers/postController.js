const Post = require('../Model/postSchema.js');
const User =require('../Model/userSchema.js')

const multer =require('multer')

const imageUpload= () =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, '../../client/public/uploads')
        },
        filename: function (file, cb) {
          
          cb(null, Date.now() + '-' + file.originalname)
        }
      })
      
    const upload = multer({ storage: storage })
    return upload;
}



const createPost = async (req, res) => {
    try {
        const { title, content, tags, selectedFile, createdBy} = req.body;
        const selectedFiles = req.files
        if(!(title && content)){
            res.status(400).json({message:"Required data not available"})
        }
        const newPost = new Post({
            title,
            content,
            selectedFile,
            tags,
            createdBy,
            createdAt: new Date().toDateString(),
        });
        await newPost.save();
        return res.status(200).json({message: "Post Created!!",newPost});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


 const getPosts = async (req, res) => {
    try {
        const Posts = await Post.find();
        res.status(200).json(Posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

 const getPostsBySearch = async (req, res) => {
 
    try {
        const { query } = req.query;
        const posts = await Post.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, 
               
            ]
        });

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found matching the search query' });
        }

        res.status(200).json({ message: 'Posts found', posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

 const getPostById = async (req, res) => {
    const userId = req.params.userId; 

    try {
        const post = await Post.find({createdBy: userId})
        if (!post)
            return res.status(404).json({ message: 'Could not find post' });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
 const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
       
        const { title, content, tags, selectedFile } = req.body;

        const updatedPost = await Post.findByIdAndUpdate({_id:id}, {
            title,
            content,
            tags,
            selectedFile,
        },); 

        if(!updatedPost){
            res.status(400).json({message:"Not found"})
        }
        return res.status(200).json({message:"Post Updated Successfully",updatePost})
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
      const deletedPost = await Post.findOneAndDelete({_id:id})
      if(!deletedPost){
        return res.status(400).json({ message:"Post not Found"})
      }
        return res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
module.exports = {
    createPost,
    getPosts,
    getPostsBySearch,
    getPostById,
    updatePost,
    deletePost,
    imageUpload
};
