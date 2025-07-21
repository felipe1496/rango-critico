import type { CityModel } from "./CityModel";
import type { RestaurantModel } from "./RestaurantModel";
import type { UserModel } from "./UserModel";

export type Rate = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

type CompanionModel = {
	review_id: ReviewModel["id"];
	companion_name: UserModel["name"];
	user_id: UserModel["id"];
	avatar_url: UserModel["avatar_url"];
};

// TODO: ajustar para ter models inteiros de Restaurant e City
export type ReviewModel = {
	id: string;
	content: string;
	rating: Rate;
	user_id: string;
	updated_at: Date;
	created_at: Date;
	visited_at: Date;
	restaurant: Pick<
		RestaurantModel,
		"id" | "name" | "description" | "avatar_url"
	>;
	city: Pick<CityModel, "id" | "name" | "state">;
	companions: {
		name: CompanionModel["companion_name"];
		avatar_url: CompanionModel["avatar_url"];
	}[];
	tags: string[];
};

export type CreateReviewModel = {
	content: string;
	rating: Rate;
	restaurant_id: string;
	user_id: string;
	visited_at?: Date;
	city_id: string;
};
