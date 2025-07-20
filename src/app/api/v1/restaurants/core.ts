import { select } from "@/utils/api/functions";
import { InternalServerErrorException } from "@/utils/errors/InternalServerErrorException";
import type { Where } from "@/utils/where-filter";

export const restaurants = select<{
	id: string;
	name: string;
	description: string;
	avatar_url?: string | null;
	city_id: string;
	created_at: Date;
}>("restaurants");

export const findRestaurants = async (where?: Where) => {
	const res = await restaurants(where);

	if (!res.ok) {
		throw new InternalServerErrorException("Error finding restaurants");
	}

	return res.data;
};
