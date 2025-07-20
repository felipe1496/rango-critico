import type {
	CreateDetailReviewModel,
	CreateReviewModel,
	ReviewCompanionView,
	ReviewTagModel,
	ReviewViewModel,
} from "@/models/ReviewModel";
import { $delete, insert, select } from "@/utils/api/functions";
import { InternalServerErrorException } from "@/utils/errors/InternalServerErrorException";

import { type Where, where } from "@/utils/where-filter";
import { set, toNumber } from "lodash";
import { ulid } from "ulid";

const reviewsView = select<ReviewViewModel>("v_reviews");
const reviewsCompanions = select<ReviewCompanionView>("v_reviews_companions");
const reviewTags = select<ReviewTagModel>("review_tags");
const deleteReview = $delete("reviews");
const insertReview = insert<CreateReviewModel, ReviewViewModel>("reviews");

export const findReviews = async (filter?: Where) => {
	const reviewsRes = await reviewsView(filter);

	if (!reviewsRes.ok) {
		throw new InternalServerErrorException("Error finding reviews");
	}

	let companions: ReviewCompanionView[] = [];

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

	let tags: ReviewTagModel[] = [];

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
		...set(r, "rating", toNumber(r.rating)),
		companions: companions.filter((c) => c.review_id === r.id),
		tags: tags.filter((t) => t.review_id === r.id).map((t) => t.tag),
	}));
};

export const deleteReviewById = async (id: string) => {
	const res = await deleteReview(where().and("id", "eq", id));

	if (!res.ok) {
		throw new InternalServerErrorException("Error deleting review");
	}
};

export const createReview = async (data: CreateDetailReviewModel) => {
	const res = await insertReview({ id: ulid(), ...data });

	if (!res.ok) {
		throw new InternalServerErrorException("Error creating review");
	}

	const review = await findReviews(where().and("id", "eq", res.data[0].id));

	return review[0];
};
