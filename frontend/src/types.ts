export interface IUser {
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
}

export interface IAuthor extends IUser {
  following: boolean;
}

export interface IArticle {
  author: IAuthor;
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: Array<string>;
  favorites_count: number;
  created_at: string;
  updated_at: string;
  favorited: boolean;
}

export interface IComment {
  id: number;
  author: IAuthor;
  body: string;
  created_at: string;
  updated_at: string;
}

// Response types
export interface IArticlesResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<IArticle>;
}

export interface INavigationLink {
  name: string;
  path: string;
  visibility: "public" | "guest" | "user";
  icon?: string;
}

export interface IArticlesQueryParams {
  page?: number;
  tag?: string;
  author?: string;
  favorited?: string;
}
