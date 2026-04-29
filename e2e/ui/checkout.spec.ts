import { test } from "@playwright/test";
import { createUser } from "../constants/testData";
import {
  addFirstProductToCart,
  expectOrderConfirmed,
  goToCart,
  goToShop,
  placeOrder,
  registerUser,
} from "../pages/shopPage";

test("user can register, add product, and place order", async ({ page }) => {
  const user = createUser();

  await goToShop(page);
  await registerUser(page, user);
  await addFirstProductToCart(page);
  await goToCart(page);
  await placeOrder(page, user);
  await expectOrderConfirmed(page);
});
