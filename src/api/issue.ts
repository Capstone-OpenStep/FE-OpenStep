import api from "./client";

import { Issue, IssueDescription, IssueBookmarked } from "../types/issue";

export interface IssueDescriptionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: IssueDescription;
}

export const getIssueDescription = async (issueId : number): Promise<IssueDescription> => {
  
  const response = await api.get<IssueDescriptionResponse>(`/issues/${issueId}`);
  return response.data.result;
}

interface TrendingIssueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    issueList: Issue[];
  };
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
  return response.data.result.issueList;
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

interface setBookmarkIssueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    bookmarkId: number,
    memberId: number,
    repoId: number,
    issueId: number,
    issueTitle: string,
    createdAt: string,
  };
}

export const setBookmarkIssue = async (issueId : number): Promise<boolean> => {
  const response = await api.post<setBookmarkIssueResponse>(`/bookmark/add/${issueId}`);
  return response.data.isSuccess;
}

interface getBookmarkIssueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    bookmarkList: IssueBookmarked[];
  };
}

export const getBookmarkIssue = async (): Promise<IssueBookmarked[]> => {
  const response = await api.get<getBookmarkIssueResponse>(`/bookmark/list`);
  return response.data.result.bookmarkList;
}

interface delBookmarkIssueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    bookmarkId: number;
  };
}

export const delBookmarkIssue = async (issueId : number): Promise<boolean> => {
  const response = await api.delete<delBookmarkIssueResponse>(`/bookmark/delete/${issueId}`);
  return response.data.isSuccess;
}