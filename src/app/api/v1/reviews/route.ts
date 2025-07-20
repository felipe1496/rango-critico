import { handleAPI } from "@/utils/api/handleAPI";
import { authGuard } from "@/utils/api/middlewares/authGuard";
import { createReview, findReviews } from "./core";
import z from "zod";
import { where } from "@/utils/where-filter";

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
	.fn(async (req) => {
		const cretedReview = await createReview({
			...req.body,
			user_id: req.userId,
		});

		return { review: cretedReview };
	});

export const GET = handleAPI()
	.middleware(authGuard)
	.fn(async (req) => {
		const userId = req.userId;

		// TODO: ordenar por visited_at
		const reviews = await findReviews(
			where().and("user_id", "eq", userId).orderBy("created_at", "desc"),
		);

		return { reviews };
	});
