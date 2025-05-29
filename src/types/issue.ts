export interface Issue {
  issueId: number;
  title: string;
  body: string;
  summary: string;
  language: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  labels: string[];
}

export interface IssueDescription {
  issueId: number,
  repoId: number,
  title: string,
  body: string,
  summary: string,
  language: string,
  url: string,
  createdAt: string,
  updatedAt: string,
  author: string,
  labels: [
    string
  ]
}