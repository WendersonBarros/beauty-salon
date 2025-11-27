import { useQuery } from "@tanstack/react-query";
import api from "../api/authApi";

interface VerifyResponse {
  user: string;
}

export function useSession() {
  return useQuery<VerifyResponse>({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await api.get<VerifyResponse>("/admin/verify");
      return res.data;
    },
    retry: false,
  });
}
