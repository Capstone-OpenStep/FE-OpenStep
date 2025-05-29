import api from "./client";
import { RepositoryDescription, Repository } from "../types/repository";

export interface RepositoryDescriptionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: RepositoryDescription;
}

export const getRepositoryDescription = async (repoId : number): Promise<RepositoryDescription> => {
  const response = await api.get<RepositoryDescriptionResponse>(`/repo/${repoId}`);


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