export interface UserProfile {
  id: string;
  full_name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  twitter_handle: string | null;
  github_handle: string | null;
  linkedin_handle: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileFormData {
  full_name: string;
  bio?: string;
  location?: string;
  website?: string;
  twitter_handle?: string;
  github_handle?: string;
  linkedin_handle?: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data?: UserProfile;
}