import { useMutation } from "@tanstack/react-query";
import type { CreateReviewModel, ReviewModel } from "@/models/ReviewModel";
import type { MutationOpts } from "@/utils/types";
import { useAPI } from "../useAPI";

export const useCreateReview = ({
	mutationKey = [],
	...props
}: MutationOpts<ReviewModel, Omit<CreateReviewModel, "user_id">> = {}) => {
	const api = useAPI();

	return useMutation({
		mutationKey: ["create-review", ...mutationKey],
		mutationFn: (props) => api.post("/reviews", props).then((res) => res.data),
		...props,
	});
};
