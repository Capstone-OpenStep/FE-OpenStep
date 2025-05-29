export interface Repository {
  repoId: number;
  repoName: string;
  summary: string;
  ownerName: string;
  language: string | null;
  stars: number;
  watchers: number;
  forks: number;
  openIssues: number;
  closedIssues: number;
  githubUrl: string;
  description: string;
}

export interface RepositoryDescription {
  repoId: number;
  repoName: string;
  summary: string;
  ownerName: string;
  description: string;
  language: string;
  stars: number;
  watchers: number;
  forks: number;
  openIssues: number;
  closedIssues: number;
  beginnerIssueCount: number;
  githubUrl: string;
  readmeUrl: string;
}