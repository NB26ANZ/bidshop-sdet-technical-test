import { APIRequestContext, request } from "@playwright/test";

type User = {
  email: string;
  password: string;
  name?: string;
};

export const createApiClient = async (): Promise<APIRequestContext> => {
  return await request.newContext({
    baseURL: "http://localhost:4000",
  });
};

export const registerUser = async (api: APIRequestContext, user: User) => {
  return await api.post("/auth/register", { data: user });
};

export const loginUser = async (
  api: APIRequestContext,
  user: Pick<User, "email" | "password">,
) => {
  return await api.post("/auth/login", { data: user });
};
