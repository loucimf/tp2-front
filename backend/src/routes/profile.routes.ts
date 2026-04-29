import { Router } from "express";
import {
  emptyProfileListResponse,
  profileModelExample,
} from "../models/profile.model.js";

export const profileRouter = Router();

profileRouter.get("/", (_req, res) => {
  res.json({
    items: emptyProfileListResponse,
    example: profileModelExample,
  });
});
