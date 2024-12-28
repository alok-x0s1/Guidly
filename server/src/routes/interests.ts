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

router.route("/").get(getAllInterests);
router.use(isLoggedIn, isLoggedIn);

router.route("/").post(createInterest);
router.route("/:id").patch(updateInterest).delete(deleteInterest);
router.route("/all").delete(deleteAllInterests);

export default router;
