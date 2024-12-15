import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middlewares/auth";
import {
	createSkill,
	deleteSkill,
	getAllSkills,
	updateSkill,
} from "../controllers/skills";

const router = Router();

router.use(isLoggedIn);
router.route("/").get(getAllSkills).post(isAdmin, createSkill);
router.route("/:id").patch(isAdmin, updateSkill).delete(isAdmin, deleteSkill);

export default router;
