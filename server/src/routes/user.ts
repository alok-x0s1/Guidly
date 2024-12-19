import { Router } from "express";
import {
	deleteUser,
	getUser,
	getUserById,
	updateUsername,
} from "../controllers/user";
import { isLoggedIn } from "../middlewares/auth";

const router = Router();

router
	.route("/")
	.get(isLoggedIn, getUser)
	.patch(isLoggedIn, updateUsername)
	.delete(isLoggedIn, deleteUser);
router.route("/:id").get(getUserById);

export default router;
