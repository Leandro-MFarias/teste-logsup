import { Router } from "express";
import { createUser, getUser, signIn } from "../controllers/userController.js";
import { logoutSession } from "../utils/jwt.js";
import { auth } from "../middleware/auth.js"

const router = Router()

router.post("/register", createUser)
router.post("/login", signIn)
router.post("/logout", logoutSession)
router.get("/me", auth, getUser)

export default router