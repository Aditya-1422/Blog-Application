import express from 'express'
import { deleteById, getAllUser, updateById } from '../controller/userController.js';
const router = express.Router();

router.get("/",getAllUser)
router.put("/:id",updateById)
router.delete("/:id",deleteById)


export default router;