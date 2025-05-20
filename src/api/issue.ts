import api from "./client";
import { Issue } from "../types/issue";

interface TrendingIssueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Issue[];
}

interface RecommendedIssueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    issueList: Issue[];
  };
}

export const getTrendingIssues = async (): Promise<Issue[]> => {
  const response = await api.get<TrendingIssueResponse>("/issues/trending");
  return response.data.result;
};

export const getRecommendedIssues = async (): Promise<Issue[]> => {
  const response = await api.get<RecommendedIssueResponse>("/issues/suggest");
  if (!response.data.isSuccess) {
    const err = new Error(response.data.message);
    (err as any).code = response.data.code;
    throw err;
  }
  return response.data.result.issueList;
};