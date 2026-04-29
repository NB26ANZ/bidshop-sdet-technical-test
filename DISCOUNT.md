# Discount Feature Plan

## Feature Request

Apply a **10% discount** to any order with a **subtotal greater than NZD $100**.

For me, this is mainly a planning and test strategy exercise rather than a coding task. The most important thing first is to make sure the discount rules are fully clear before anyone starts building or testing it.

## 1. Clarifying Questions

Before starting, these are the main things I would want to confirm with Product and Devs.

### Discount rule

- Is the discount applied when subtotal is **strictly over** $100?
- Or does it apply at **$100 and above**?

### Calculation logic

- Is the 10% discount applied to the **subtotal only**?
- Or to the **total including GST**?
- Should GST be calculated **before** or **after** the discount?

### UI behaviour

- Should the discount appear in:
  - cart
  - checkout
  - final order confirmation
  - all of the above
- Should it apply automatically with no promo code?

### Cart behaviour

- If the cart goes over $100 and then drops below it, should the discount disappear immediately?
- Should the discount recalculate live when quantity changes?

### Data / order behaviour

- Should the discount be stored on the final order record?
- Should it be stored as a separate line or just as part of the totals?

### Edge cases

- What should happen when subtotal is:
  - exactly `$100.00`
  - `$99.99`
  - `$100.01`
- What rounding rules should be used?

## 2. What Would Need to Change

### API

The main pricing logic should live in the backend, not in the frontend.

Likely API changes:

- cart response includes discount details
- order response includes discount details
- total calculation logic is updated
- GST calculation is updated depending on agreed rule
- discount recalculates whenever cart contents change

Example response shape:

```json
{
  "subtotal": 120.0,
  "discount": 12.0,
  "gst": 16.2,
  "total": 124.2
}
```

The exact shape can vary, but the important thing is that the discount is explicit and easy to validate.

### UI

The UI should clearly show the customer:

- when the discount applies
- how much discount they received
- what the final total is

Likely UI changes:

- cart page shows a discount row when eligible
- checkout page shows the same discount row
- order confirmation reflects the discounted total
- discount disappears clearly if the cart drops below the threshold

The wording should stay consistent across all pages.

### Data Model

At minimum, cart and order totals would need to support discount-related values.

Possible additions:

- `discount`
- `discountType`
- `discountRate`
- `discountLabel`
- `discountedSubtotal`

I would also want the final order to store the discount that was actually applied at the time of purchase, rather than recalculating it later.

That matters if discount rules change in future.

## 3. Test Strategy

I would want this feature covered as part of the normal CI/CD pipeline so that pricing behaviour is validated before merge, not later.

My approach would be to cover the rule in a practical way without adding unnecessary duplication.

### API coverage

I would still want direct API coverage for the pricing logic because it is the fastest and clearest way to validate the rule itself.

That would cover things like:

- subtotal under $100 → no discount
- subtotal over $100 → 10% discount applied
- subtotal exactly at the threshold
- subtotal just below / just above the threshold
- quantity changes causing the discount to appear or disappear
- GST and total calculations being correct
- rounding behaviour
- order response storing the discount correctly

This gives quick feedback in CI and makes failures easier to diagnose.

### End-to-end coverage

I would also want at least one strong end-to-end UI flow that proves the full integrated customer journey works through the frontend and backend together.

That means validating the discount through the actual application flow:

- add products until cart goes over threshold
- verify discount appears in cart
- continue to checkout
- verify discount still appears there
- place order
- verify the final total reflects the discount

Even though the UI test is going through the frontend, it is still validating the backend behaviour as part of the full flow, because the pricing logic is being exercised through the real application path.

### Overall approach

So I would not think about this as “API instead of E2E” or “E2E instead of API”.

I would think about it as:

- **API coverage** for fast, precise validation of the rule
- **E2E coverage** for confidence that the real integrated journey works
- both running in CI/CD as part of quality gates before merge

The goal would be to get strong confidence as early as possible while keeping the test suite practical and maintainable.

## 4. Regression Strategy

To make sure this feature does not break existing behaviour, I would regression check:

- cart calculations
- GST calculation
- order placement
- order confirmation totals
- quantity updates
- removing items from cart
- empty cart behaviour

Main risk areas:

1. totals no longer matching between cart and checkout
2. GST being calculated in the wrong order
3. confirmation showing different values from checkout
4. discount remaining visible when it should no longer apply
5. standard non-discounted orders breaking

## 5. What I Would Want Before Shipping

Before release, I would want:

- final confirmed discount rules from Product
- confirmed expected calculation examples
- agreed rounding behaviour
- agreement on whether threshold is `>` or `>=`
- updated API contract
- agreed UI wording
- automated API coverage for the pricing logic
- at least one solid end-to-end UI journey covering the feature

If possible, I would also want a few example orders reviewed and agreed by Product and Dev so everyone is aligned on the expected totals before release.

## Summary

The main risk in this feature is not the 10% itself, but making sure the pricing logic is **clear, consistent, and correct everywhere**.

My approach would be:

1. clarify the rules first
2. keep the calculation logic in the backend
3. expose discount values clearly in the API
4. show the discount clearly in the UI
5. cover the calculation thoroughly at API level
6. use a smaller UI flow to prove the end-to-end experience
7. regression test totals carefully so existing checkout behaviour does not break
