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
  bookmarked: boolean;
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
  authorAvatarUrl: string,
  labels: [
    string
  ]
  repoName: string,
  repoUrl: string,
  bookmarked: boolean;
}

export interface IssueBookmarked {
  memberId: number,
  bookmarkId: number,
  issueId: number,
  repoId: number,
  repoName: string,
  ownerName: string,
  issueTitle: string,
  language: string,
  stars: number,
  githubUrl: string,
  createdAt: string,
  updatedAt: string,
  bookmarked: boolean,
}