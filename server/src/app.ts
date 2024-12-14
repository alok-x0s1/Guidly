import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/config";

const app: Express = express();

app.use(
	cors({
		origin: [`${config.clientUrl}`],
		credentials: true,
	})
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Import of all routes
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

// Use of all routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/api", (req, res) => {
	res.status(200).json({
		message: "Hello from Guidly API",
	});
});

export default app;
