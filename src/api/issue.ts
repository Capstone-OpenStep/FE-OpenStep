import api from "./client";

import { Issue, IssueDescription, IssueBookmarked } from "../types/issue";
import { RepositoryDescription } from "../types/repository";


export interface IssueSearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    issueList: Issue[];
  };
}

export const searchIssue = async (searchKeyword: string, language: string[], period: string | null, page: number = 0) => {
  const params = new URLSearchParams();
  params.append("search", searchKeyword);
  params.append("page", page.toString());

  if (language && language.length > 0) {
    language.forEach(lang => {
      params.append("languages", lang.toUpperCase());
    });
  }
  if (period) {
    params.append("updatePeriod", period);
  }
  const response = await api.get<TrendingIssueResponse>(`/issues/search/keyword?${params.toString()}`);
  return response.data.result.issueList;
};

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

export interface IssueDescriptionFromUrlResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    issue: IssueDescription,
    repo: RepositoryDescription,
  };
}

export const getIssueDescriptionFromUrl = async (githubUrl : string): Promise<{ issue: IssueDescription, repo: RepositoryDescription }> => {

  const response = await api.get<IssueDescriptionFromUrlResponse>(`/issues/detail-by-url?url=${encodeURIComponent(githubUrl)}`);
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

export const getTrendingIssues = async (page: number = 0): Promise<Issue[]> => {
  const response = await api.get<TrendingIssueResponse>(`/issues/trending?page=${page}`);
  return response.data.result.issueList;
};

export const getRecommendedIssues = async (page: number = 0): Promise<Issue[]> => {
  const response = await api.get<RecommendedIssueResponse>(`/issues/suggest?page=${page}`);
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
  const response = await api.get<getBookmarkIssueResponse>(`/bookmark/list/`);
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