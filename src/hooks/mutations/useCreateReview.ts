import { useMutation } from "@tanstack/react-query";
import { useAPI } from "../useAPI";
import type { MutationOpts } from "@/utils/types";
import type {
	CreateDetailReviewModel,
	ReviewDetail,
} from "@/models/ReviewModel";

export const useCreateReview = ({
	mutationKey = [],
	...props
}: MutationOpts<
	ReviewDetail,
	Omit<CreateDetailReviewModel, "user_id">
> = {}) => {
	const api = useAPI();

	return useMutation({
		mutationKey: ["create-review", ...mutationKey],
		mutationFn: (props) => api.post("/reviews", props).then((res) => res.data),
		...props,
	});
};
