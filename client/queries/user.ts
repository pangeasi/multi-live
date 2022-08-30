import { useQueryClient } from "react-query";
import { trpc } from "utils/trpc";

export const useCreateUser = () => {
  return trpc.useMutation("user.create");
};

export const useLogin = () => {
  const qc = useQueryClient();
  return trpc.useMutation("user.login", {
    onSuccess() {
      qc.invalidateQueries("user.me");
    },
  });
};

export const useMe = () => {
  return trpc.useQuery(["user.me"]);
};

export const useLogout = () => {
  const qc = useQueryClient();

  return trpc.useMutation("user.logout", {
    onSuccess() {
      qc.invalidateQueries("user.me");
      qc.removeQueries("user.me");
    },
  });
};
