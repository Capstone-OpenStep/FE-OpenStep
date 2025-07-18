export interface Task {
  taskId: number;
  title: string;
  forkedUrl: string;
  status: "NOT_STARTED" | "FORKED" | "PROGRESS" | "PR" | "REVIEW" | "REJECTED" | "MERGED";
  branchName: string;
  createdAt: string;
  updatedAt: string;
  issueId: number;
  issueUrl: string;
  prUrl: string;
}

export interface GroupedTasks {
  repoId: number,
  repository: string,
  description: string,
  language: string,
  starCount: number,
  last_github_update: string,
  tasks: TaskItem[]
};

export interface TaskItem {
  taskId: number;
  title: string;
  status: "NOT_STARTED" | "FORKED" | "PROGRESS" | "PR" | "REVIEW" | "REJECTED" | "MERGED";
  branchName: string,
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

export interface TaskStatistic {
  "feature": number,
  "bug": number,
  "refactor": number,
  "good first issue": number,
  "chore": number,
  "other": number
}

export interface PRRegister {
  "taskId": number,
  "title": string,
  "forkedUrl": string,
  "status": "NOT_STARTED" | "FORKED" | "PROGRESS" | "PR" | "REVIEW" | "REJECTED" | "MERGED";
  "branchName": string,
  "createdAt": string,
  "updatedAt": string,
  "issueId": number,
  "issueUrl": string
}

export type Stage =
  | 'NOT_STARTED'
  | 'FORKED'
  | 'PROGRESS'
  | 'PR'
  | 'REVIEW'
  | 'MERGED'
  | 'REJECTED';