export interface LinkedInProfile {
  id: string;
  name: string;
  title: string;
  skills: string[];
  url: string;
  avatar: string;
}

export interface ScrapingProgress {
  currentProfile: string;
  profilesCompleted: number;
  totalProfiles: number;
}