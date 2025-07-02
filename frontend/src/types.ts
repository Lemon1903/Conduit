export interface BasicUser {
  username: string;
  email: string;
}

export interface Profile extends BasicUser {
  bio: string;
  image: string | null;
}