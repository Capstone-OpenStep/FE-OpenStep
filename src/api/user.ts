import api from "./client";
import {  } from "../types/issue";
import { Level } from "../types/user"

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

export interface getLevelResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Level;
}

export const getLevel = async (): Promise<Level> => {
  const response = await api.get<getLevelResponse>(`/rank/level`);
  return response.data.result;
};
