import { expect, Page } from "@playwright/test";
import { CHECKOUT_DETAILS, SHOP_URL } from "../constants/shopConstants";
import { getByLabel, getByRole, PageLocator } from "../utils/pageUtils";

type User = {
  name: string;
  email: string;
  password: string;
};

const registerLink: PageLocator = getByRole("link", /register/i);
const fullNameInput: PageLocator = getByLabel("Full name");
const emailInput: PageLocator = getByLabel("Email");
const passwordInput: PageLocator = getByLabel(/password/i);
const createAccountButton: PageLocator = getByRole("button", /create account/i);

const cartLink: PageLocator = getByRole("link", /cart/i);
const logoutButton: PageLocator = getByRole("button", /log out/i);

const continueToCheckoutButton: PageLocator = getByRole(
  "button",
  /continue to checkout/i,
);

const checkoutNameInput: PageLocator = getByLabel(/full name/i);
const checkoutEmailInput: PageLocator = getByLabel(/email/i);
const checkoutAddressInput: PageLocator = getByLabel(/street address/i);
const checkoutCityInput: PageLocator = getByLabel(/city/i);
const checkoutPostcodeInput: PageLocator = getByLabel(/postcode/i);

const placeOrderButton: PageLocator = getByRole("button", /place order/i);
const orderSummaryHeading: PageLocator = getByRole("heading", /order summary/i);

export const goToShop = async (page: Page) => {
  await page.goto(SHOP_URL);
};

export const registerUser = async (page: Page, user: User) => {
  await registerLink(page).click();
  await fullNameInput(page).fill(user.name);
  await emailInput(page).fill(user.email);
  await passwordInput(page).fill(user.password);
  await createAccountButton(page).click();

  await expect(logoutButton(page)).toBeVisible();
};

export const addFirstProductToCart = async (page: Page) => {
  const enabledAddToCartButtons = page.locator(
    '[data-testid^="product-add-"]:not([disabled])',
  );
  await enabledAddToCartButtons.first().click();
};

export const goToCart = async (page: Page) => {
  await cartLink(page).click();
};

export const placeOrder = async (page: Page, user: User) => {
  await expect(continueToCheckoutButton(page)).toBeEnabled();
  await continueToCheckoutButton(page).click();

  await checkoutNameInput(page).fill(user.name);
  await checkoutEmailInput(page).fill(user.email);
  await checkoutAddressInput(page).fill(CHECKOUT_DETAILS.address);
  await checkoutCityInput(page).fill(CHECKOUT_DETAILS.city);
  await checkoutPostcodeInput(page).fill(CHECKOUT_DETAILS.postcode);

  await expect(placeOrderButton(page)).toBeEnabled();
  await placeOrderButton(page).click();
};

export const expectOrderConfirmed = async (page: Page) => {
  await expect(orderSummaryHeading(page)).toBeVisible();
};
