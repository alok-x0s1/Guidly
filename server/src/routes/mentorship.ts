import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import {
	acceptRequest,
	declineRequest,
	getActiveConnections,
	getAllRequests,
	getMatches,
	sendRequest,
} from "../controllers/mentorship";

const router = Router();

router.use(isLoggedIn);
router.route("/matches").get(getMatches);
router.route("/requests").get(getAllRequests);
router.route("/request").post(sendRequest);
router.route("/active").get(getActiveConnections);

router.route("/accept/:id").post(acceptRequest);
router.route("/decline/:id").post(declineRequest);

export default router;
