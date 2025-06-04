import api from "./client";
import {  } from "../types/issue";
import { RankUser } from "../types/rank"

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

export interface getRanksResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    ranks: RankUser[];
  };
}

export const getRanks = async (): Promise<RankUser[]> => {
  const response = await api.get<getRanksResponse>(`/rank/all`);
  return response.data.result.ranks;
}