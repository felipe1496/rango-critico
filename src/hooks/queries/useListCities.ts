import { useQuery } from "@tanstack/react-query";
import type { CityModel } from "@/models/CityModel";
import type { QueryOpts } from "@/utils/types";
import { where } from "@/utils/where-filter";
import { useAPI } from "../useAPI";

export const useListCities = ({
	queryKey = [],
	...props
}: QueryOpts<{ cities: CityModel[] }> & {
	querySearch?: string;
} = {}) => {
	const api = useAPI();
	const filter = where();

	if (props.querySearch) {
		filter.and("name", "like", `${props.querySearch}`);
	}

	return useQuery({
		queryKey: ["list-cities", ...queryKey],
		queryFn: () =>
			api
				.get("/cities", {
					params: {
						filter: filter.buildWebFilter(),
					},
				})
				.then((res) => res.data),
		...props,
	});
};
