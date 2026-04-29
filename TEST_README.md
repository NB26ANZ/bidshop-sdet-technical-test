# Bidshop SDET Technical Test

## Overview

For this technical test, I used **Playwright with TypeScript** for both the API and UI side.

I wanted to keep the framework simple, clean, and practical. I did not want to over engineer it or build something overly developer heavy just for the sake of it, so I structured it in a way that I would actually want to maintain in a real project, based on what I believe are current best practices.

I used **one tool for both API and UI** because it keeps the setup easier to understand and easier to run.

I also chose a **Functional Programming style** rather than a class heavy OOP Page Object Model. Instead of large stateful classes, I used smaller reusable functions for page actions and API helpers. For a take-home test like this, I felt that was the cleanest and most practical approach.

## Tech Stack

- **Framework:** Playwright
- **Language:** TypeScript
- **API + UI:** handled in one test project
- **Style:** lightweight Functional Programming approach

## Project Structure

```text
e2e/
├── api/
│   ├── auth.spec.ts
│   ├── products.spec.ts
│   └── cartAndOrder.spec.ts
├── ui/
│   └── checkout.spec.ts
├── pages/
│   └── shopPage.ts
├── utils/
│   ├── apiUtils.ts
│   └── pageUtils.ts
└── constants/
    ├── shopConstants.ts
    └── testData.ts
```

## What I Covered

### API coverage

I focused on the API first because it is the fastest and most reliable place to validate the main business logic.

Covered scenarios:

- user can register and log in
- duplicate registration is rejected
- user can view products and categories
- user can add an item to cart and place an order
- unauthenticated user cannot access cart

### UI coverage

For the UI side, I kept it focused on one clean end-to-end customer journey.

Covered scenario:

- register a new user
- add a product to cart
- continue to checkout
- fill out the checkout form
- place an order successfully

## Why I Took This Approach

I wanted the submission to reflect how I think as a QE.

In a shift-left CI/CD setup, I believe in validating the right things at the right level as early as possible. For this exercise, I used API tests to cover core business behavior quickly and directly, while using UI coverage for the main end-to-end journey and the user facing behavior that matters in the browser.

I kept the UI coverage intentionally focused. I did not want to duplicate large amounts of API coverage in the browser or add extra UI tests just for volume. For this exercise, it made more sense to:

- keep UI focused on the most valuable user journeys
- use API tests for fast, direct validation of core business rules
- use UI tests where user facing behavior matters, such as validation, errors, and end-to-end flow
- avoid unnecessary duplication while still covering the right risks

## Prerequisites

Please make sure the following are installed:

- Node.js 18+
- npm
- Git

## Setup

From the project root:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
npx playwright install
```

If the frontend does not connect to the backend, create `frontend/.env` with:

```env
VITE_API_BASE_URL=http://localhost:4000
```

## Scripts

These are the main scripts / commands to run the application and test suites.

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

### Run all tests

```bash
npx playwright test
```

### Run API tests only

```bash
npx playwright test e2e/api
```

### Run UI tests only

```bash
npx playwright test e2e/ui
```

### Run checkout UI test only

```bash
npx playwright test e2e/ui/checkout.spec.ts
```

### Run checkout UI test in headed mode

```bash
npx playwright test e2e/ui/checkout.spec.ts --headed
```

### Open Playwright report

```bash
npx playwright show-report
```

## Exact Run Order From a Clean Checkout

### Terminal 1 — backend

```bash
cd backend
npm install
npm run dev
```

### Terminal 2 — frontend

```bash
cd frontend
npm install
npm run dev
```

### Terminal 3 — tests

```bash
npm install
npx playwright install
npx playwright test
```

## Useful URLs

### Backend

- http://localhost:4000
- http://localhost:4000/health
- http://localhost:4000/api-docs

### Frontend

- http://localhost:5173

## Notes and Trade-offs

This solution is intentionally focused and not overbuilt.

### What I chose to do

- use one framework for both API and UI
- keep the structure simple and easy to follow
- use a lightweight FP-style setup instead of class-heavy OOP
- focus on the highest-value flows first
- keep browser coverage small but meaningful

### What I did not try to do

- cover every single endpoint
- add lots of UI tests just for numbers
- build a large abstraction layer that this exercise does not really need

For a take-home like this, I think a smaller clean setup is better than a large messy one.

## If I Had More Time

I would improve it further by:

- adding fixtures for shared setup to reduce repetition further
- adding stronger assertions around confirmation details after checkout
- adding API schema validation against the OpenAPI spec
- improving config and environment handling a bit more
- adding CI so the suite runs automatically on push

## Summary

My main goal here was to build something clean, practical, and easy to own.

This submission focuses on:

- clear structure
- simple Playwright setup
- good API coverage for the important business flows
- one valuable end-to-end UI journey
- a lightweight Functional Programming style
- a QE led approach instead of over engineering

This is the kind of setup I would prefer building in a real team.
