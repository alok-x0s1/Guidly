import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import {
	addInterests,
	addSkills,
	createProfile,
	deleteProfile,
	getProfile,
	getProfileById,
	removeInterests,
	removeSkills,
	updateProfile,
} from "../controllers/profile";
import upload from "../middlewares/multer";

const router = Router();

router
	.route("/")
	.get(isLoggedIn, getProfile)
	.post(isLoggedIn, upload.single("avatar"), createProfile);
router.route("/:id").get(getProfileById);
router
	.route("/:id")
	.patch(isLoggedIn, updateProfile)
	.delete(isLoggedIn, deleteProfile);

router
	.route("/:id/skills")
	.post(isLoggedIn, addSkills)
	.delete(isLoggedIn, removeSkills);

router
	.route("/:id/interests")
	.post(isLoggedIn, addInterests)
	.delete(isLoggedIn, removeInterests);

export default router;
