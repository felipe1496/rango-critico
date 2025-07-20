import type { PartialBy } from "@/utils/types";

export type Rate = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type ReviewModel = {
	id: string;
	content: string;
	rating: Rate;
	user_id: string;
	restaurant_id: string;
	city_id: string;
	visited_at: Date;
	updated_at: Date;
	created_at: Date;
};

// TODO: analisar remoção de models explicitamente de banco e migrar para funções sql utils
export type CreateReviewModel = PartialBy<
	Pick<
		ReviewModel,
		"id" | "content" | "rating" | "user_id" | "restaurant_id" | "visited_at"
	>,
	"visited_at"
>;

export type CreateDetailReviewModel = PartialBy<
	Pick<
		ReviewModel,
		| "content"
		| "rating"
		| "user_id"
		| "restaurant_id"
		| "visited_at"
		| "city_id"
	>,
	"visited_at"
>;

export type ReviewCompanionView = {
	review_id: string;
	companion_name: string;
	user_id: string;
	avatar_url: string;
};

export type ReviewDetail = ReviewViewModel & {
	companions: ReviewCompanionView[];
	tags: string[];
};

export type ReviewViewModel = {
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
};

export type ReviewTagModel = {
	id: string;
	review_id: string;
	tag: string;
	created_at: Date;
};
