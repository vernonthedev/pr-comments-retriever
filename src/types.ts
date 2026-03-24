export interface PRComment {
  id: number;
  body: string;
  user: { login: string };
  created_at: string;
  updated_at: string;
}

export interface PRReview {
  id: number;
  body: string;
  user: { login: string };
  state: string;
  submitted_at: string;
}

export interface PRIssueComment {
  id: number;
  body: string;
  user: { login: string };
  created_at: string;
}

export interface PR {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  html_url: string;
  user: { login: string };
  created_at: string;
  updated_at: string;
  comments: number;
  review_comments: number;
}

export interface PRMetadata {
  owner: string;
  repo: string;
  prNumber: number;
  title: string;
  state: string;
  url: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  prBody: string;
  commentsCount: number;
  reviewCommentsCount: number;
}
