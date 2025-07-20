export type RestaurantModel = {
	id: string;
	name: string;
	description: string;
	avatar_url?: string | null;
	city_id: string;
	created_at: Date;
};
