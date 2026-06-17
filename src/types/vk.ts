export interface VKPostResponse {
  posts: VKPost[];
  cachedAt: string | null;
}

export interface VKPost {
  id: number;
  text: string;
  date: string; // ISO 8601
  media?: PostMedia[];
  linkToOriginal: string;
}

export interface PostMedia {
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
}

// Telegram типы (используют ту же структуру)
export interface TelegramPostResponse {
  posts: TelegramPost[];
  total: number;
}

export interface TelegramPost {
  id: number;
  text: string;
  date: string; // ISO 8601
  media?: PostMedia[];
  linkToOriginal: string;
}
