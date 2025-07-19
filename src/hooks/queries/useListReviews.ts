import { useAPI } from "@/hooks/useAPI";
import { ReviewDetail } from "@/models/ReviewModel";
import { ApiParse, QueryOpts } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useListReviews = ({
  ...props
}: QueryOpts<{ reviews: ApiParse<ReviewDetail>[] }> = {}) => {
  const api = useAPI();

  return useQuery({
    queryKey: ["list-reviews"],
    queryFn: () => api.get("/reviews").then((res) => res.data),
    ...props,
  });
};
