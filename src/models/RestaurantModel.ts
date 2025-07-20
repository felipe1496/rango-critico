import type { CityModel } from "./CityModel";

export type RestaurantModel = {
	id: string;
	name: string;
	description: string;
	avatar_url?: string | null;
	city_id: string;
	created_at: Date;
};

export type RestaurantDetail = Pick<
	RestaurantModel,
	"id" | "name" | "description" | "avatar_url" | "created_at"
> & {
	city: CityModel;
};
