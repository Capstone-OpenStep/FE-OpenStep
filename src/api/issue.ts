import api from "./client";
import { IssueDescription } from "../types/issue";

export interface IssueDescriptionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: IssueDescription;
}

export const getIssueDescription = async (issueId : number): Promise<IssueDescription> => {
  
  const response = await api.get<IssueDescriptionResponse>(`/issues/${issueId}`);
  return response.data.result;
};