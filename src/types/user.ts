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

export interface Acheievement {
  id: number;
  type: "FIRST_COMMIT" | "BUF_HUNTER" | "PR_MASTER" | "CONSISTENT_DEV" | "EXPLORER_LV1" | "EXPLORER_LV2" | "EXPLORER_LV3" | "MENTOR";
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt: string;
  currentProgress: number;
  targetCount: number;
  newlyUnlocked: boolean;
}