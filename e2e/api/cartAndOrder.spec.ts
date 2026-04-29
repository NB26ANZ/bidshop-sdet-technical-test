import { test, expect } from "@playwright/test";
import { CHECKOUT_DETAILS } from "../constants/shopConstants";
import { createUser } from "../constants/testData";
import { createApiClient } from "../utils/apiUtils";

test("user can add to cart and place an order", async () => {
  const api = await createApiClient();
  const user = createUser();

  const registerResponse = await api.post("/auth/register", { data: user });
  expect(registerResponse.status()).toBe(201);

  const loginResponse = await api.post("/auth/login", {
    data: {
      email: user.email,
      password: user.password,
    },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  const productsResponse = await api.get("/products");
  expect(productsResponse.status()).toBe(200);

  const productsBody = await productsResponse.json();

  const availableProduct = productsBody.items.find(
    (product: { id: string; stock: number }) => product.stock > 0,
  );

  expect(availableProduct).toBeTruthy();

  const productId = availableProduct.id;

  const addToCartResponse = await api.post("/cart/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      productId,
      quantity: 1,
    },
  });

  expect(addToCartResponse.status()).toBe(201);

  const orderResponse = await api.post("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      customer: {
        name: user.name,
        email: user.email,
        address: CHECKOUT_DETAILS.address,
        city: CHECKOUT_DETAILS.city,
        postcode: CHECKOUT_DETAILS.postcode,
      },
    },
  });

  expect(orderResponse.status()).toBe(201);

  const orderBody = await orderResponse.json();
  expect(orderBody.id).toBeTruthy();
});

test("unauthenticated user cannot access cart", async () => {
  const api = await createApiClient();

  const response = await api.get("/cart");

  expect(response.status()).toBe(401);
});
