import api from "./client";
import { Issue } from "../types/issue";

interface TrendingIssueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Issue[];
}

export const getTrendingIssues = async (): Promise<Issue[]> => {
  const response = await api.get<TrendingIssueResponse>("/issues/trending");
  return response.data.result;
};