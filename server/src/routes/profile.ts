import { Router } from "express";
import isLoggedIn from "../middlewares/auth";
import {
	createProfile,
	deleteProfile,
	getProfile,
	getProfileById,
	updateProfile,
} from "../controllers/profile";

const router = Router();

router.route("/").get(isLoggedIn, getProfile).post(isLoggedIn, createProfile);
router.route("/:id").get(getProfileById);
router
	.route("/:id")
	.patch(isLoggedIn, updateProfile)
	.delete(isLoggedIn, deleteProfile);

export default router;
