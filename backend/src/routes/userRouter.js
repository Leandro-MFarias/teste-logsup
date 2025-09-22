import { Router } from "express";
import {
  createUser,
  getRoles,
  getUser,
  listUsers,
  signIn,
  updateUserRole,
} from "../controllers/userController.js";
import { logoutSession } from "../utils/jwt.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

router.post("/users", createUser);
router.post("/auth/login", signIn);
router.get("/users/me", auth, getUser);
router.get("/users", auth, listUsers);
router.post("/auth/logout", auth, logoutSession);
router.get("/users/roles", auth, getRoles);
router.patch("/users/:id/role", auth, isAdmin, updateUserRole);

export default router;
