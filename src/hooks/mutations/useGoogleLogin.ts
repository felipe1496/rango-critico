import { useAPI } from "@/hooks/useAPI";
import { UserModel } from "@/models/UserModel";
import { ApiExceptionModel } from "@/utils/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
export const useGoogleLogin = ({
  mutationKey = [],
  ...props
}: Omit<
  UseMutationOptions<
    { user: UserModel; access_token: string },
    ApiExceptionModel,
    { access_token: string }
  >,
  "mutationFn"
> = {}) => {
  const api = useAPI();

  return useMutation({
    mutationKey: ["post-google-login", ...mutationKey],
    mutationFn: async (props) => {
      const res = await api.post("/auth/login", props);

      return res.data;
    },
    ...props,
  });
};
