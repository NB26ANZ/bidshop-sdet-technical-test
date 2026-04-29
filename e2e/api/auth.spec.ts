import { test, expect } from "@playwright/test";
import { createUser } from "../constants/testData";
import { createApiClient, registerUser, loginUser } from "../utils/apiUtils";

test("user can register and login", async () => {
  const api = await createApiClient();
  const user = createUser();

  const registerResponse = await registerUser(api, user);
  expect(registerResponse.status()).toBe(201);

  const loginResponse = await loginUser(api, {
    email: user.email,
    password: user.password,
  });

  expect(loginResponse.status()).toBe(200);

  const body = await loginResponse.json();
  expect(body.token).toBeTruthy();
});

test("duplicate registration is rejected", async () => {
  const api = await createApiClient();
  const user = createUser();

  const firstResponse = await registerUser(api, user);
  expect(firstResponse.status()).toBe(201);

  const duplicateResponse = await registerUser(api, user);
  expect(duplicateResponse.status()).toBe(409);
});
