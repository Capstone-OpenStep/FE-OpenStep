import api from "./client";
import { Task, GroupedTasks, TaskItem, TaskAssignResult, TaskStatistic, PRRegister } from "../types/task";

export interface TaskResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Task;
}

export const getTask = async (taskId: number): Promise<Task> => {
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

export const assignTask = async (issueId: number): Promise<TaskAssignResult> => {
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


export interface UpdatePrUrlResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PRRegister;
};


export const updatePrUrl = async (taskId: number, url: string): Promise<PRRegister> => {
  const response = (await api.get<UpdatePrUrlResponse>(`/tasks/${taskId}/pr?url=${encodeURIComponent(url)}`));
  if (!response.data.isSuccess) {
    const err = new Error(response.data.message);
    (err as any).code = response.data.code;
    throw err;
  }
  return response.data.result;
}

export interface GetNotificationResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: TaskItem[];
};

export const getNotification = async (): Promise<TaskItem[]> => {
  const response = (await api.get<GetNotificationResponse>(`/tasks/update-status`));
  if (!response.data.isSuccess) {
    const err = new Error(response.data.message);
    (err as any).code = response.data.code;
    throw err;
  }
  return response.data.result;
}