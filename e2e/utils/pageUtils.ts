import { Locator, Page } from "@playwright/test";

export type PageLocator = (page: Page) => Locator;
export type PageAction = (page: Page, ...args: unknown[]) => Promise<void>;

type SupportedRole =
  | "link"
  | "button"
  | "heading"
  | "textbox"
  | "combobox"
  | "option"
  | "alert";

export const getByRole =
  (role: SupportedRole, name: string | RegExp): PageLocator =>
  (page: Page) =>
    page.getByRole(role, { name });

export const getByLabel =
  (label: string | RegExp): PageLocator =>
  (page: Page) =>
    page.getByLabel(label);

export const getByText =
  (text: string | RegExp): PageLocator =>
  (page: Page) =>
    page.getByText(text);

export const getByTestId =
  (testId: string): PageLocator =>
  (page: Page) =>
    page.getByTestId(testId);
