import * as z from "zod/v4";

import { ARTICLES_PER_PAGE } from "@/constants";
import { client, setAccessToken } from "@/lib/auth";
import type articleSchema from "@/schemas/articleSchema";
import type loginSchema from "@/schemas/loginSchema";
import type profileSchema from "@/schemas/profileSchema";
import type registerSchema from "@/schemas/registerSchema";
import type { IArticle, IArticlesQueryParams, IAuthor, IUser } from "@/types";

export async function login(values: z.infer<typeof loginSchema>) {
  const loginRes = await client.post("/users/login/", values);
  setAccessToken(loginRes.data.access_token);

  const profileRes = await client.get("/user/");
  return profileRes.data;
}

export async function register(userData: z.infer<typeof registerSchema>) {
  const response = await client.post(`/users/`, userData);
  return response.data;
}

export async function logout() {
  await client.post("/users/logout/");
}

export async function getUser() {
  const response = await client.get("/user/");
  return response.data as IUser;
}

export async function getProfile(username: string) {
  const response = await client.get(`/profiles/${username}/`);
  return response.data as IAuthor;
}

export async function updateProfile(values: z.infer<typeof profileSchema>) {
  const response = await client.patch("/user/", values);
  const userData: IUser = response.data;
  return userData;
}

export async function getArticles(
  params?: IArticlesQueryParams,
  endpoint: string = "/articles",
  signal?: AbortSignal,
) {
  const queryParams = new URLSearchParams({ limit: ARTICLES_PER_PAGE.toString() });

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value.toString());
      }
    });
  }

  const response = await client.get(`${endpoint}?${queryParams}`, { signal });
  return response.data;
}

export async function getArticle(slug?: string, signal?: AbortSignal) {
  if (!slug) return null;
  const response = await client.get(`/articles/${slug}/`, { signal });
  return response.data as IArticle;
}

export async function createArticle(values: z.infer<typeof articleSchema>, signal?: AbortSignal) {
  const response = await client.post("/articles/", values, { signal });
  return response.data as IArticle;
}

export async function updateArticle(
  slug: string,
  values: z.infer<typeof articleSchema>,
  signal?: AbortSignal,
) {
  const response = await client.put(`/articles/${slug}/`, values, { signal });
  return response.data as IArticle;
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("Mocked delete error");
}

export async function deleteArticle(slug: string, signal?: AbortSignal) {
  await client.delete(`/articles/${slug}/`, { signal });
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("Mocked delete error");
}

export async function favoriteArticle(slug: string, signal?: AbortSignal) {
  await client.post(`/articles/${slug}/favorite/`, { signal });
}

export async function unfavoriteArticle(slug: string, signal?: AbortSignal) {
  await client.delete(`/articles/${slug}/favorite/`, { signal });
}

export async function getComments(slug: string, signal?: AbortSignal) {
  const response = await client.get(`/articles/${slug}/comments/`, { signal });
  return response.data;
}

export async function createComment(slug: string, body: string, signal?: AbortSignal) {
  const response = await client.post(`/articles/${slug}/comments/`, { body }, { signal });
  return response.data;
}

export async function editComment(slug: string, id: number, body: string, signal?: AbortSignal) {
  const response = await client.patch(`/articles/${slug}/comments/${id}/`, { body }, { signal });
  return response.data;
}

export async function deleteComment(slug: string, id: number, signal?: AbortSignal) {
  await client.delete(`/articles/${slug}/comments/${id}/`, { signal });
}

export async function getTags(signal?: AbortSignal) {
  const response = await client.get("/tags/", { signal });
  return response.data.tags;
}

export async function followUser(username: string, signal?: AbortSignal) {
  const response = await client.post(`/profiles/${username}/follow/`, { signal });
  return response.data.detail as string;
}

export async function unfollowUser(username: string, signal?: AbortSignal) {
  const response = await client.delete(`/profiles/${username}/follow/`, { signal });
  return response.data.detail as string;
}
