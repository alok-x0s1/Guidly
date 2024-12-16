import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import {
	createNotification,
	getAllNotifications,
	getNotificationById,
	markNotificationAsRead,
} from "../controllers/notifications";

const router = Router();

router.use(isLoggedIn);
router.route("/").get(getAllNotifications).post(createNotification);
router.route("/:id").get(getNotificationById);
router.route("/:id/seen").get(markNotificationAsRead);

export default router;
