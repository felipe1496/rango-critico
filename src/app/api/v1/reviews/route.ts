import z from "zod";
import type { ReviewModel } from "@/models/ReviewModel";
import { handleAPI } from "@/utils/api/handleAPI";
import { authGuard } from "@/utils/api/middlewares/authGuard";
import { where } from "@/utils/where-filter";
import { createReview, findReviews } from "./core";

export const POST = handleAPI()
	.middleware(authGuard)
	.body(
		z.object({
			content: z.string().max(5000),
			restaurant_id: z.string(),
			rating: z.union([
				z.literal(0),
				z.literal(0.5),
				z.literal(1),
				z.literal(1.5),
				z.literal(2),
				z.literal(2.5),
				z.literal(3),
				z.literal(3.5),
				z.literal(4),
				z.literal(4.5),
				z.literal(5),
			]),
			visited_at: z
				.string()
				.optional()
				.transform((v) => (v ? new Date(v) : undefined)),
			city_id: z.string(),
		}),
	)
	.fn(async (req): Promise<{ review: ReviewModel }> => {
		const cretedReview = await createReview({
			...req.body,
			user_id: req.userId,
		});

		return { review: cretedReview };
	});

export const GET = handleAPI()
	.middleware(authGuard)
	.fn(async (req): Promise<{ reviews: ReviewModel[] }> => {
		const userId = req.userId;

		const reviews = await findReviews(
			where().and("user_id", "eq", userId).orderBy("visited_at", "desc"),
		);

		return { reviews };
	});
