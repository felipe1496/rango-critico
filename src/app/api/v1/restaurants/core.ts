import { RestaurantModel } from "@/models/RestaurantModel";
import { select } from "@/utils/api/functions";
import { InternalServerErrorException } from "@/utils/errors/InternalServerErrorException";
import { Where } from "@/utils/where-filter";

export const restaurants = select<RestaurantModel>("restaurants");

export const findRestaurants = async (where?: Where) => {
  const res = await restaurants(where);

  if (!res.ok) {
    throw new InternalServerErrorException("Error finding restaurants");
  }

  return res.data;
};
