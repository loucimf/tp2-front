import { Router } from "express";
import {
  emptyUserGameListResponse,
  userGameModelExample,
} from "../models/user-game.model.js";

export const userGameRouter = Router();

userGameRouter.get("/", (_req, res) => {
  res.json({
    items: emptyUserGameListResponse,
    example: userGameModelExample,
  });
});
