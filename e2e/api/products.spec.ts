import { test, expect } from "@playwright/test";
import { createApiClient } from "../utils/apiUtils";

test("user can view products and categories", async () => {
  const api = await createApiClient();

  const productsResponse = await api.get("/products");
  expect(productsResponse.status()).toBe(200);

  const productsBody = await productsResponse.json();
  expect(productsBody.count).toBeGreaterThan(0);
  expect(productsBody.items.length).toBeGreaterThan(0);

  const categoriesResponse = await api.get("/products/categories");
  expect(categoriesResponse.status()).toBe(200);

  const categoriesBody = await categoriesResponse.json();
  expect(categoriesBody.categories.length).toBeGreaterThan(0);
});
