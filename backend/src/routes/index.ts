import { Router } from "express";
import { profileRouter } from "./profile.routes.js";
import { gamesRouter } from "./games.routes.js";
import { userRouter } from "./user.routes.js";
import { requireAuth } from "../middleware/require-auth.js";
import { ENVIRONMENT } from "../env.js";

export const apiRouter = Router();

if (ENVIRONMENT === "production") {
	apiRouter.get("/", requireAuth, (_req, res) => {
		res.json({
			message: "Express backend is running PROD!",
		});
	});
} else {
	apiRouter.get("/", (_req, res) => {
		res.json({
			message: "Express backend is running either: DEV | TEST!",
		});
	});
}


apiRouter.use("/profiles", profileRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use("/user-games", userRouter);
