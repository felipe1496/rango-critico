import { useQuery } from "@tanstack/react-query";
import { useAPI } from "@/hooks/useAPI";
import type { ReviewModel } from "@/models/ReviewModel";
import type { QueryOpts } from "@/utils/types";

export const useListReviews = ({
	...props
}: QueryOpts<{ reviews: ReviewModel[] }> = {}) => {
	const api = useAPI();

	return useQuery({
		queryKey: ["list-reviews"],
		queryFn: () => api.get("/reviews").then((res) => res.data),
		...props,
	});
};
