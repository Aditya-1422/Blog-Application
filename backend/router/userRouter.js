import express from 'express'
import { deleteById, getAllUser, getUserById, updateById } from '../controller/userController.js';
import { verifyToken } from '../verifyToken.js';
const router = express.Router();

router.get("/",getAllUser)
router.put("/:id",verifyToken,updateById)
router.delete("/:id",deleteById)
router.get("/:id",getUserById)


export default router;