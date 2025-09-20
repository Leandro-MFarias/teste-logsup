import { Router } from "express";
import { createUser, signIn } from "../controllers/userController.js";

const router = Router()

router.post("/register", createUser)
router.post("/login", signIn)

export default router