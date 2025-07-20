import z from "zod";
import type { CityModel } from "@/models/CityModel";
import { handleAPI } from "@/utils/api/handleAPI";
import { authGuard } from "@/utils/api/middlewares/authGuard";
import { where } from "@/utils/where-filter";
import { findCities } from "./core";

export const GET = handleAPI()
	.middleware(authGuard)
	.queryParams(
		z.object({
			filter: z.string().optional(),
		}),
	)
	.fn(async (req): Promise<{ cities: CityModel[] }> => {
		const filter = where().addExpression(req.queryParams.filter);

		const cities = await findCities(filter);

		return {
			cities,
		};
	});
