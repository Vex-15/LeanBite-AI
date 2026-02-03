import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// --- CONFIGURATION ---
// Valid model confirmed from your list
const MODEL_NAME = "gemini-2.5-flash"; 

/* ------------------ Constants & Types ------------------ */

const DIET_TYPES = ["veg", "non-veg"] as const;
const GOALS = ["survival", "balanced", "energy"] as const;

type DietType = (typeof DIET_TYPES)[number];
type Goal = (typeof GOALS)[number];

interface MealPlanRequestBody {
  availableFoods: string;
  budget: number;
  mealsPerDay: number;
  dietType: DietType;
  goal: Goal;
}

/* ------------------ Validation ------------------ */

function validateBody(body: unknown): body is MealPlanRequestBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  return (
    typeof b.availableFoods === "string" &&
    b.availableFoods.trim().length > 0 &&
    typeof b.budget === "number" &&
    b.budget >= 0 &&
    typeof b.mealsPerDay === "number" &&
    b.mealsPerDay >= 1 &&
    b.mealsPerDay <= 3 &&
    typeof b.dietType === "string" &&
    DIET_TYPES.includes(b.dietType as DietType) &&
    typeof b.goal === "string" &&
    GOALS.includes(b.goal as Goal)
  );
}

/* ------------------ Prompt Builder ------------------ */

function buildPrompt({
  availableFoods,
  budget,
  mealsPerDay,
  dietType,
  goal,
}: MealPlanRequestBody): string {
  return `
You are an expert nutritionist and budget meal planner. 
Your goal is to create a ${goal} meal plan using ONLY: ${availableFoods}.

CRITICAL RULES FOR DIET (${dietType}):
1. **Strict Filtering**: You must filter the "Available Foods" list based on the Diet Type: "${dietType}".
2. **Veg Logic**: If Diet is "veg", you MUST NOT use Eggs, Meat, Fish, or Chicken, even if they are listed in "Available Foods". Pretend they are not there.
3. **Non-Veg Logic**: If Diet is "non-veg", you may use any ingredient listed.

CRITICAL RULES FOR PLANNING:
1. **Chain of Thought**: First, list which ingredients from the user's list are allowed under the "${dietType}" diet. Then plan the meals.
2. **Strict Budget**: The total cost must be under ₹${budget}.
3. **Realistic Portions**: Do not suggest tiny, unrealistic portions.

MEALS PER DAY: ${mealsPerDay}

Return ONLY valid JSON strictly matching this schema (do not use Markdown):

{
  "_thinking": "First, I filtered the list. I excluded [ingredients] because they do not fit the ${dietType} diet. Then...",
  "meal_plan": {
    "meal_1": { "name": "...", "ingredients": ["..."], "protein_estimate": "..." },
    "meal_2": { "name": "...", "ingredients": ["..."], "protein_estimate": "..." },
    "meal_3": { "name": "...", "ingredients": ["..."], "protein_estimate": "..." } 
  },
  "nutrition_analysis": {
    "total_calories_approx": number,
    "protein_quality": "Low" | "Medium" | "High",
    "strengths": ["string", "string"],
    "weaknesses": ["string", "string"],
    "missing_nutrients": ["..."]
  },
  "tradeoffs": "...",
  "cheap_substitutions": [
    {
      "item": "string",
      "reason": "string",
      "estimated_cost": "string"
    }
  ],
  "practical_tips": "..."
}
`.trim();
}

/* ------------------ POST Handler ------------------ */

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error: API key missing." },
        { status: 500 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    if (!validateBody(body)) {
      return NextResponse.json(
        {
          error:
            "Invalid input. Required: availableFoods, budget >= 0, mealsPerDay (1-3), dietType (veg|non-veg), goal.",
        },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(body);

    /* -------- Gemini REST API Call -------- */
    
    // We use the MODEL_NAME variable defined at the top (gemini-2.5-flash).
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            // gemini-2.5-flash supports native JSON mode
            response_mime_type: "application/json",
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("🔥 GEMINI RAW ERROR 🔥", data);
      return NextResponse.json(
        {
          error: data?.error?.message || JSON.stringify(data),
        },
        { status: geminiResponse.status }
      );
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      return NextResponse.json(
        { error: "Empty response from Gemini." },
        { status: 502 }
      );
    }

    /* -------- JSON Cleanup -------- */
    
    let raw = text;
    if (raw.startsWith("```")) {
      raw = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", raw);
      return NextResponse.json(
        { error: "Gemini returned invalid JSON." },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Meal plan API error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}