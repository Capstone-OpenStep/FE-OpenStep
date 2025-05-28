export interface Task {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    taskId: number;
    title: string;
    forkedUrl: string;
    status: "NOTSTARTED" | "FORKED" | "PR" | "review" | "Approve" | "Closed";
    branchName: string;
    createdAt: string;
    updatedAt: string;
    issueId: number;
    issueUrl: string;
  }
}

export type GroupedTasks = Record<string, TaskItem[]>;

export interface TaskItem {
  taskId: number;
  title: string;
  status: "NOTSTARTED" | "FORKED" | "PR" | "review" | "Approve" | "Closed";
  createdAt: string;
  updatedAt: string;
}

export interface TaskAssignResult {
  issueId: number,
  taskId: number,
  title: string,
  originalUrl: string,
  branchName: string,
  forkedUrl: string,
  isAssigned: boolean,
  createdAt: string;
  updatedAt: string;
}