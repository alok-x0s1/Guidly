import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middlewares/auth";
import {
	createInterest,
	deleteAllInterests,
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
router.route("/all").delete(isAdmin, deleteAllInterests);

export default router;
