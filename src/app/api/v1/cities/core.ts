import { select } from "@/utils/api/functions";
import { InternalServerErrorException } from "@/utils/errors/InternalServerErrorException";
import type { Where } from "@/utils/where-filter";

const cities = select<{
	id: string;
	name: string;
	state: string;
	created_at: Date;
}>("cities");

export const findCities = async (filter?: Where) => {
	const res = await cities(filter);

	if (!res.ok) {
		throw new InternalServerErrorException("Error finding cities");
	}

	return res.data;
};
