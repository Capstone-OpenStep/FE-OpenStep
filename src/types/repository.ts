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