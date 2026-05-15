import { Router } from "express";
import { requireAuth, type AuthenticatedRequest } from "../middleware/require-auth.js";
import {
	emptyUserGameListResponse,
	userGameModelExample,
} from "../models/user-game.model.js";
import {
	listUserGames,
	updateUserGame,
	upsertUserGame,
} from "../repositories/user-games.repository.js";

export const userRouter = Router();

function readString(value: unknown): string | undefined {
	return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readNumber(value: unknown): number | undefined {
	const rawValue = readString(value);
	if (!rawValue) return undefined;

	const parsedValue = Number(rawValue);
	return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

userRouter.put("/library", requireAuth, async (req, res) => {
	const authReq = req as AuthenticatedRequest;
	const gameApiId = readNumber(req.body?.gameId);
	const title = readString(req.body?.title);
	const releaseDate = readString(req.body?.releaseDate) ?? null;
	const price = readNumber(req.body?.price) ?? null;
	const category = readNumber(req.body?.category) ?? null;

	if (!gameApiId) {
		res.status(400).json({ error: "gameId must be a valid number." });
		return;
	}

	try {
		if (title) {
			const item = await upsertUserGame({
				userId: authReq.userId,
				gameApiId,
				title,
				releaseDate,
				price,
				category,
			});

			res.status(200).json({ item });
			return;
		}

		const item = await updateUserGame(authReq.userId, gameApiId, {
			price,
			category,
		});

		if (!item) {
			res.status(404).json({
				error: "Game is not in the user's library. Send title to add it.",
			});
			return;
		}

		res.status(200).json({ item });
	} catch (error) {
		res.status(500).json({
			error: "Failed to update user library.",
			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
});

userRouter.get("/library", requireAuth, async (req, res) => {
	const authReq = req as AuthenticatedRequest;

	try {
		const items = await listUserGames(authReq.userId);
		res.json({ items });
	} catch (error) {
		res.status(500).json({
			error: "Failed to load user library.",
			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
});

userRouter.get("/library/example", (_req, res) => {
	res.json({
		items: emptyUserGameListResponse,
		example: userGameModelExample,
	});
});
