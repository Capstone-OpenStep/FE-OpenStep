export interface Level {
    level: number,
    levelPercent: number,
    percentRemaining: number,
}

export interface UserProfile {
  githubId: string;
  email: string;
  avatarUrl: string;
  location: string;
  profileUrl: string;
  followersCount: number;
  followingCount: number;
}