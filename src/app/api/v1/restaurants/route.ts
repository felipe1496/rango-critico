import z from "zod";
import type { RestaurantModel } from "@/models/RestaurantModel";
import { handleAPI } from "@/utils/api/handleAPI";
import { authGuard } from "@/utils/api/middlewares/authGuard";
import { where } from "@/utils/where-filter";
import { findRestaurants } from "./core";

export const GET = handleAPI()
	.middleware(authGuard)
	.queryParams(
		z.object({
			filter: z.string().optional(),
		}),
	)
	.fn(async (req): Promise<{ restaurants: RestaurantModel[] }> => {
		const filter = req.queryParams.filter;

		const whereFilter = where();

		if (filter) {
			whereFilter.addExpression(filter);
		}

		const restaurants = await findRestaurants(whereFilter);

		return {
			restaurants,
		};
	});
