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

router.use(isLoggedIn);
router.route("/").get(getAllSkills).post(isAdmin, createSkill);
router.route("/:id").patch(isAdmin, updateSkill).delete(isAdmin, deleteSkill);
router.route("/all").delete(isAdmin, deleteAllSkills);

export default router;
