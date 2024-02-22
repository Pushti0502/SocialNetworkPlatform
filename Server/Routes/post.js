const {createPost,imageUpload,getPosts,getPostsBySearch,getPostById,updatePost,deletePost}=require('../Controllers/postController')
const router =require("express").Router();
router.post("/createPost", imageUpload().single('selectedFile'), createPost);

router.get("/getPosts",getPosts)
router.get("/getPostById/:id",getPostById)
router.get("/getPostBySearch",getPostsBySearch)
router.patch("/updatePost/:id",updatePost)
router.delete("/deletePost/:id",deletePost)
module.exports = router;