import api from "./client";

import { Issue, IssueDescription } from "../types/issue";

export interface IssueDescriptionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: IssueDescription;
}

export const getIssueDescription = async (issueId : number): Promise<IssueDescription> => {
  
  const response = await api.get<IssueDescriptionResponse>(`/issues/${issueId}`);
  return response.data.result;


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