import api from "./client";
import {  } from "../types/issue";
import { RankUser } from "../types/rank"
import { Level, UserProfile } from "../types/user"

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


export interface getUserProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: UserProfile;
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get<getUserProfileResponse>(`/member/github/profile/realtime`);
  return response.data.result;
};
