export interface UpdateUserDTO {
    name?: string;
    avatar?: string;
    bio?: string;
    socialLinks?: { platform: string; url: string }[];
  }
    