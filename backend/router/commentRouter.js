import express from 'express'
import { createComment, deleteCommentById, getAllComments, getPostComments, updateCommentById } from '../controller/commentController.js';
const router = express.Router();

router.post('/write',createComment)
router.put("/:id",updateCommentById)
router.delete("/:id",deleteCommentById)
router.get("/post/:postId",getPostComments);
router.get("/comments",getAllComments);



export default router;