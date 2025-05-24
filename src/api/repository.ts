import api from "./client";
import { RepositoryDescription } from "../types/repository";

export interface RepositoryDescriptionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: RepositoryDescription;
}

export const getRepositoryDescription = async (repoId : number): Promise<RepositoryDescription> => {
  const response = await api.get<RepositoryDescriptionResponse>(`/repo/${repoId}`);
  return response.data.result;
};