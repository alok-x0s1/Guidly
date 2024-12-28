import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middlewares/auth";
import {
	createSkill,
	deleteAllSkills,
	deleteSkill,
	getAllSkills,
	updateSkill,
} from "../controllers/skills";

const router = Router();

router.route("/").get(getAllSkills);
router.use(isLoggedIn, isAdmin);

router.route("/").post(createSkill);
router.route("/:id").patch(updateSkill).delete(deleteSkill);
router.route("/all").delete(deleteAllSkills);

export default router;
