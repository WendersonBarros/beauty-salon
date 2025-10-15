import axios from "axios";
import type { Category } from "../types/types";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:3000/categories";

export function useGetCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await axios.get(API_URL);
      return result.data;
    }
  });
}
