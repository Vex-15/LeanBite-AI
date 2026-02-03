# LeanBite AI

AI-powered meal planning for food scarcity and budget constraints. The system works only with what you actually have and reasons honestly about nutrition trade-offs.

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **Node.js** backend via Next.js API routes
- **Gemini API** (`@google/generative-ai`)
- No database

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set your Gemini API key:

   ```bash
   cp .env.example .env.local
   ```

   In `.env.local`:

   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **Important:** The API key is only used on the server. Never expose it to the frontend.

3. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app/` — App Router pages (landing, plan)
- `src/app/api/meal-plan/` — POST API route for meal planning (Gemini)
- `src/components/` — Nav, MealPlanForm, MealPlanResults
- `src/types/` — Meal plan response types

## API

- **POST `/api/meal-plan`**

  Body (JSON):

  - `availableFoods` (string) — What the user has
  - `budget` (number) — Budget in ₹
  - `mealsPerDay` (1–3)
  - `dietType` — `"veg"` or `"non-veg"`
  - `goal` — `"survival"` | `"balanced"` | `"energy"`

  Returns the meal plan JSON (meal_plan, nutrition_analysis, tradeoffs, cheap_substitutions).

## Scope

- No calorie counters or nutrition perfection scores
- No database or auth
- Single internal-tool style flow: land → plan → results
