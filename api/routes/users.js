import express from 'express';
import { addUser, deleteUser, getUsers, updateUser, registerUser, loginUser } from "../controllers/user.js";
import sendMessage from "../utils/sendMessage.js";
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/send-message", sendMessage); 

export default router;
