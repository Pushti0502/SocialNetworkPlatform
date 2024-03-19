
const {createPost,imageUpload,getPosts,getPostById,likePost,commentPost,updatePost,deletePost, getComments}=require('../Controllers/postController')
const {postSchema} =require('../Model/postSchema')
const{validate} = require("../Middlewares/validationMiddleware")

const router =require("express").Router();

router.post("/createPost", imageUpload().single('selectedFile'), createPost);

router.get("/getPosts",getPosts)
router.get("/:userId/getPostById",getPostById)
router.patch("/:userId/likePost/:id",likePost) 
router.patch("/:id/commentPost",commentPost)
router.get("/:id/getComments",getComments)
router.patch("/:id/updatePost",updatePost)
router.delete("/:id/deletePost",deletePost)
module.exports = router; 