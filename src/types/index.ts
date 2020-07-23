export interface Topic {
  id: string;
  tab: string;
  title: string;
  author_id: string;
  author: Author;
  content?: string;
  good?: boolean;
  top?: boolean;
  visit_count?: number;
  reply_count?: number;
  last_reply_at: string;
  create_at: string;
}

export interface Author {
  avatar_url: string;
  loginname: string;
}

export interface Article extends Topic {
  is_collect: boolean;
  replies: Comment[];
}

export interface ArticleLink {
  id: string;
  author: Author;
  title: string;
  last_reply_at: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  is_uped: boolean;
  create_at: string;
  reply_id?: string;
  ups?: Array<string>;
}

export interface UserDetail {
  avatar_url: string;
  create_at: string;
  githubUsername: string;
  loginname: string;
  recent_replies: ArticleLink[];
  recent_topics: ArticleLink[];
  score: number;
}