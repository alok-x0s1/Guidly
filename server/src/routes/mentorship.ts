import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import {
	acceptRequest,
	declineRequest,
	getActiveConnections,
	getAllMentors,
	getAllReceivedRequests,
	getAllRequests,
	getAllSentRequests,
	getMatches,
	getMentorById,
	sendRequest,
} from "../controllers/mentorship";

const router = Router();

router.route("/").get(getAllMentors);
router.route("/mentor/:id").get(getMentorById);
router.use(isLoggedIn);

router.route("/matches").get(getMatches);
router.route("/requests").get(getAllRequests);
router.route("/requests/sent").get(getAllSentRequests);
router.route("/requests/received").get(getAllReceivedRequests);
router.route("/request").post(sendRequest);
router.route("/active").get(getActiveConnections);

router.route("/accept/:id").post(acceptRequest);
router.route("/decline/:id").post(declineRequest);

export default router;
