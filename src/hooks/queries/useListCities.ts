import { useQuery } from "@tanstack/react-query";
import { useAPI } from "../useAPI";
import { ApiParse, QueryOpts } from "@/utils/types";
import { CityModel } from "@/models/CityModel";
import { where } from "@/utils/where-filter";

export const useListCities = ({
  queryKey = [],
  ...props
}: QueryOpts<{ cities: ApiParse<CityModel>[] }> & {
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
