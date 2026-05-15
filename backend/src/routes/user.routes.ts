import { Router } from "express";
import {
	emptyUserGameListResponse,
	userGameModelExample,
} from "../models/user-game.model.js";

export const userRouter = Router();


userRouter.put("/library?gameId=:gameId&price=:price&category=:category", (req, res) => {

	const gameId = req.query.gameId;
	const price = req.query.price;
	const category = req.query.category;

	try {
		
	} catch (error) {
		
	}
});

userRouter.get("/library", (req, res) => {
	res.json({
		items: emptyUserGameListResponse,
		example: userGameModelExample,
	});
});
