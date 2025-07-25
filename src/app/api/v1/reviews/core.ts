import { toNumber } from "lodash";
import { ulid } from "ulid";
import type { CreateReviewModel, Rate } from "@/models/ReviewModel";
import { $delete, insert, select } from "@/utils/api/functions";
import { InternalServerErrorException } from "@/utils/errors/InternalServerErrorException";
import type { InferOk } from "@/utils/types";
import { type Where, where } from "@/utils/where-filter";

const reviewsView = select<{
	id: string;
	content: string;
	rating: number;
	user_id: string;
	updated_at: Date;
	created_at: Date;
	visited_at: Date;
	restaurant_id: string;
	restaurant_name: string;
	restaurant_description: string;
	restaurant_avatar_url?: string | null;
	city_id: string;
	city_name: string;
	city_state: string;
}>("v_reviews");
const reviewsCompanions = select<{
	review_id: string;
	companion_name: string;
	user_id: string;
	avatar_url: string;
}>("v_reviews_companions");
const reviewTags = select<{
	id: string;
	review_id: string;
	tag: string;
	created_at: Date;
}>("review_tags");
const deleteReview = $delete("reviews");
const insertReview = insert<
	{
		id: string;
		content: string;
		rating: Rate;
		user_id: string;
		restaurant_id: string;
		visited_at?: Date;
		city_id: string;
	},
	{
		id: string;
		content: string;
		rating: Rate;
		restaurant_name: string;
		restaurant_avatar_url: string;
		user_id: string;
		city_name: string;
		state: string;
		updated_at: Date;
		created_at: Date;
		visited_at: Date;
	}
>("reviews");

export const findReviews = async (filter?: Where) => {
	const reviewsRes = await reviewsView(filter);

	if (!reviewsRes.ok) {
		throw new InternalServerErrorException("Error finding reviews");
	}

	let companions: InferOk<typeof reviewsCompanions> = [];

	if (reviewsRes.data.length) {
		const reviewsCompanionsRes = await reviewsCompanions(
			where().and(
				"review_id",
				"in",
				reviewsRes.data.map((r) => r.id),
			),
		);

		if (!reviewsCompanionsRes.ok) {
			throw new InternalServerErrorException("Error finding reviews");
		}

		companions = reviewsCompanionsRes.data;
	}

	let tags: InferOk<typeof reviewTags> = [];

	if (reviewsRes.data.length) {
		const tagsRes = await reviewTags(
			where().and(
				"review_id",
				"in",
				reviewsRes.data.map((r) => r.id),
			),
		);

		if (!tagsRes.ok) {
			throw new InternalServerErrorException("Error finding reviews");
		}

		tags = tagsRes.data;
	}

	return reviewsRes.data.map((r) => ({
		id: r.id,
		content: r.content,
		rating: toNumber(r.rating) as Rate,
		user_id: r.user_id,
		updated_at: r.updated_at,
		created_at: r.created_at,
		visited_at: r.visited_at,
		restaurant: {
			id: r.restaurant_id,
			name: r.restaurant_name,
			description: r.restaurant_description,
			avatar_url: r.restaurant_avatar_url,
		},
		city: {
			id: r.city_id,
			name: r.city_name,
			state: r.city_state,
		},
		companions: companions
			.filter((c) => c.review_id === r.id)
			.map((c) => ({
				name: c.companion_name,
				avatar_url: c.avatar_url,
			})),
		tags: tags.filter((t) => t.review_id === r.id).map((t) => t.tag),
	}));
};

export const deleteReviewById = async (id: string) => {
	const res = await deleteReview(where().and("id", "eq", id));

	if (!res.ok) {
		throw new InternalServerErrorException("Error deleting review");
	}
};

export const createReview = async (data: CreateReviewModel) => {
	const res = await insertReview({ id: ulid(), ...data });

	if (!res.ok) {
		throw new InternalServerErrorException("Error creating review");
	}

	const review = await findReviews(where().and("id", "eq", res.data[0].id));

	return review[0];
};
