import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
