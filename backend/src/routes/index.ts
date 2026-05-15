import { Router } from "express";
import { profileRouter } from "./profile.routes.js";
import { gamesRouter } from "./games.routes.js";
import { userRouter } from "./user.routes.js";
import { requireAuth } from "../middleware/require-auth.js";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
	res.json({
		message: "Express backend is running!",
	});
});

apiRouter.use("/profiles", profileRouter);
apiRouter.use("/games", requireAuth, gamesRouter);
apiRouter.use("/user-games", requireAuth, userRouter);
