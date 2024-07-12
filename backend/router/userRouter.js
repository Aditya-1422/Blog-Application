import express from 'express'
import { deleteById, getAllUser, getUserById, updateById } from '../controller/userController.js';
const router = express.Router();

router.get("/",getAllUser)
router.put("/:id",updateById)
router.delete("/:id",deleteById)
router.get("/:id",getUserById)


export default router;