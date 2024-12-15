import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middlewares/auth";
import {
	createInterest,
	deleteInterest,
	getAllInterests,
	updateInterest,
} from "../controllers/interests";

const router = Router();

router.use(isLoggedIn);
router.route("/").get(getAllInterests).post(isAdmin, createInterest);
router
	.route("/:id")
	.patch(isAdmin, updateInterest)
	.delete(isAdmin, deleteInterest);

export default router;
