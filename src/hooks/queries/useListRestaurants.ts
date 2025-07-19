import { useQuery } from "@tanstack/react-query";
import { useAPI } from "../useAPI";
import { QueryOpts } from "@/utils/types";
import { RestaurantModel } from "@/models/RestaurantModel";
import { where } from "@/utils/where-filter";

export const useListRestaurants = ({
  queryKey = [],
  ...props
}: QueryOpts<{ restaurants: RestaurantModel[] }> & {
  querySearch?: string;
} = {}) => {
  const api = useAPI();
  const filter = where();

  if (props.querySearch) {
    filter.and("name", "like", `${props.querySearch}`);
  }

  return useQuery({
    queryKey: ["list-restaurants", ...queryKey],
    queryFn: () =>
      api
        .get("/restaurants", {
          params: {
            filter: filter.buildWebFilter(),
          },
        })
        .then((res) => res.data),
    ...props,
  });
};
