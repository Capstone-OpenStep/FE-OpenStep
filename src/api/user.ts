import api from "./client";
import {  } from "../types/issue";

export interface getDomainResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    domains: string[];
  };
}

export const getDomains = async (): Promise<string[]> => {
  const response = await api.get<getDomainResponse>(`/member/domains`);
  return response.data.result.domains;
};
