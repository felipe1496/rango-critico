import { handleAPI } from "@/utils/api/handleAPI";
import { authGuard } from "@/utils/api/middlewares/authGuard";
import { where } from "@/utils/where-filter";
import z from "zod";
import { findCities } from "./core";

export const GET = handleAPI()
	.middleware(authGuard)
	.queryParams(
		z.object({
			filter: z.string().optional(),
		}),
	)
	.fn(async (req) => {
		const filter = where().addExpression(req.queryParams.filter);

		const cities = await findCities(filter);

		return {
			cities,
		};
	});
