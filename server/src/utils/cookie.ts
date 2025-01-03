import { CookieOptions } from "express";
import { config } from "../config/config";

export const cookieOptions: CookieOptions = {
	httpOnly: true,
	sameSite: config.node_env === "production" ? "none" : "lax",
	secure: config.node_env === "production",
	maxAge: 1000 * 60 * 60 * 24 * 7,
};
