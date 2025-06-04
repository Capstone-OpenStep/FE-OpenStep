import api from "./client";
import { Task, GroupedTasks, TaskItem, TaskAssignResult, TaskStatistic } from "../types/task";

export interface TaskResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Task;
}

export const getTask = async (taskId : number): Promise<Task> => {
  const response = await api.get<TaskResponse>(`/tasks/${taskId}`);
  return response.data.result;
};

export interface TaskListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: GroupedTasks[];
}

export const getTaskList = async (): Promise<GroupedTasks[]> => {
  const response = await api.get<TaskListResponse>(`/tasks/recent`);
  return response.data.result;
};

export interface AssignTaskResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: TaskAssignResult;
}

export const assignTask = async (issueId : number): Promise<TaskAssignResult> => {
  const response = (await api.post<AssignTaskResponse>(`/issues/${issueId}/assign`));
  return response.data.result;
};

export interface TaskStatisticResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: TaskStatistic;
};

export const getTaskStatistic = async (): Promise<TaskStatistic> => {
  const response = (await api.get<TaskStatisticResponse>(`/tasks/statistics`));
  return response.data.result;
}