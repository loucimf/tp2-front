import { Router, type Request } from "express";
import {
	type AuthenticatedRequest,
} from "../middleware/require-auth.js";
import {
	emptyUserGameListResponse,
	userGameModelExample,
} from "../models/user-game.model.js";
import {
	deleteUserGame,
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

function readUserId(req: Request): string | undefined {
	return (
		(req as AuthenticatedRequest).userId ??
		readString(req.body?.userId ?? req.query.userId)
	);
}

userRouter.put("/library", async (req, res) => {
	const userId = readUserId(req);
	const gameApiId = readNumber(req.body?.gameId ?? req.query.gameId);
	const title = readString(req.body?.title ?? req.query.title);
	const releaseDate = readString(req.body?.releaseDate ?? req.query.releaseDate) ?? null;
	const price = readNumber(req.body?.price ?? req.query.price) ?? null;
	const category_id = readNumber(req.body?.categoryId ?? req.query.categoryId) ?? null;

	if (!gameApiId) {
		res.status(400).json({ error: "gameId must be a valid number." });
		return;
	}

	if (!userId) {
		res.status(400).json({ error: "userId is required." });
		return;
	}

	try {
		if (title) {
			const item = await upsertUserGame({
				userId,
				gameApiId,
				title,
				releaseDate,
				price,
				category_id: category_id,
			});

			res.status(200).json({ item });
			return;
		}

		const item = await updateUserGame(userId, gameApiId, {
			price,
			category_id: category_id,
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
			details: error,
		});
	}
});

userRouter.delete("/library", async (req, res) => {
	const userId = readUserId(req);
	const gameApiId = readNumber(req.body?.gameId ?? req.query.gameId);

	if (!gameApiId) {
		res.status(400).json({ error: "gameId must be a valid number." });
		return;
	}

	if (!userId) {
		res.status(400).json({ error: "userId is required." });
		return;
	}

	try {
		await deleteUserGame(userId, gameApiId);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({
			error: "Failed to remove game from user library.",
			details: error  ? error : "Unknown error",
		});
	}
});

userRouter.get("/library", async (req, res) => {
	const userId = readUserId(req);

	if (!userId) {
		res.status(400).json({ error: "userId is required." });
		return;
	}

	try {
		const items = await listUserGames(userId);
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
