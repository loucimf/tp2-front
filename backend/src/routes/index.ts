import { Router } from "express";
import { profileRouter } from "./profile.routes.js";
import { rawgapi } from "./rawgapi.routes.js";
import { userGameRouter } from "./user-game.routes.js";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    message: "Express backend is running",
  });
});

apiRouter.use("/profiles", profileRouter);
apiRouter.use("/games", rawgapi);
apiRouter.use("/user-games", userGameRouter);
