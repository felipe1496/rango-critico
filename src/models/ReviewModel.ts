export type Rate = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type ReviewModel = {
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
	companions: {
		review_id: string;
		companion_name: string;
		user_id: string;
		avatar_url: string;
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
