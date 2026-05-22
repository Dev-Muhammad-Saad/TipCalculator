# ANSWERS.md

## 1. How to Run

Open `index.html` directly in any browser — no install needed.

Or use a local server:
```bash
python3 -m http.server 3000
```
Then visit `http://localhost:3000`.

---

## 2. Stack & Design Choices

I used vanilla HTML, CSS, and JavaScript because that's what I know best right now. No frameworks.

**Decision 1 — Dark results panel against a white card.**
I wanted the output section to stand out clearly from the inputs so your eye goes straight to the numbers. Making the results box dark (#1a1a2e) against the white card creates that separation without needing extra headings or dividers.

**Decision 2 — Preset buttons update the custom input field.**
When you click 10%, 15%, or 20%, it fills the custom tip input with that value. This way there's only one place the tip value lives — the input field — and the JS only ever reads from one place. It kept the logic simple.

---

## 3. Responsive & Accessibility

The card has a max-width of 420px and full-width padding on small screens, so it works on both a 360px phone and a 1440px laptop without any layout breaking.

**Accessibility I handled:** All inputs have `<label>` elements properly linked with `for` and `id`. Error messages appear as text right below the field so they're readable without relying on color alone.

**Accessibility I skipped:** I didn't add keyboard navigation for the preset buttons beyond basic tab/click. Ideally they'd behave like a radio group with arrow key support, but I didn't have time to implement that correctly.

---

## 4. AI Usage

I used Claude (claude.ai) for this project.

I asked it to build the full tip calculator. It gave me a working version but it was too complex for my current level — it had things like sticky panels, paste sanitization, aria-live regions, and animation effects I wouldn't be able to explain in a review.

**What I changed:** The AI used `Math.round()` for the per-person amount. I asked it to explain rounding options and switched it to `Math.ceil()` because I wanted to make sure the group never underpays (explained in question 5). I also removed all the fancy features and kept only what I understood and could explain. I wrote the `showError` and `clearError` helper functions myself after understanding the pattern from the AI's version.

---

## 5. Honest Gap

The validation only shows errors after you start typing in a field. If someone fills in the bill, skips tip, and fills in people — the results just show dashes with no message explaining why. I'd fix this by adding a check that shows a "please enter a tip %" message once the bill and people fields are filled but tip is still empty.

---

## Rounding Policy

I round each per-person share **up** to the nearest paisa using `Math.ceil(value * 100) / 100`.

For example: grand total Rs 1000, 3 people → exact share is Rs 333.333... → rounded up to Rs 333.34.

I chose round-up because the point of splitting a bill is that everyone pays their share. Rounding down means the group collectively pays less than the actual bill. Rounding up means the difference is at most a paisa or two, which is acceptable.
