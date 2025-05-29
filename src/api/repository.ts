import api from "./client";
import { Repository } from "../types/repository";

interface TrendingRepositoryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Repository[];
}

export const getTrendingRepositories = async (): Promise<Repository[]> => {
  const response = await api.get<TrendingRepositoryResponse>("/repo/trending");
  return response.data.result;
};