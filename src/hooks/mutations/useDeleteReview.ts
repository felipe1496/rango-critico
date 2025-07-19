import { useAPI } from "@/hooks/useAPI";
import { ApiExceptionModel } from "@/utils/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useDeleteReview = ({
  mutationKey = [],
  ...props
}: Omit<
  UseMutationOptions<void, ApiExceptionModel, { id: string }>,
  "mutationFn"
> = {}) => {
  const api = useAPI();

  return useMutation({
    mutationKey: ["delete-review", ...mutationKey],
    mutationFn: (props) =>
      api.delete(`/reviews/${props.id}`).then((res) => res.data),
    ...props,
  });
};
