import express from 'express'
import { createPost, deletePostById, getAllPost, getPostById, getPostByUserId, updatePostById } from '../controller/postController.js';
const router = express.Router();

router.post('/write',createPost)
router.get('/',getAllPost)
router.put("/:id",updatePostById)
router.delete("/:id",deletePostById)
router.get("/:id",getPostById)
router.get("/user/:userId",getPostByUserId);



export default router;