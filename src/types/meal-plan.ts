export interface MealPlanMeal {
  name: string;
  ingredients: string[];
  protein_estimate: string;
}

export interface MealPlanResponse {
  _thinking?: string;
  meal_plan: Record<string, MealPlanMeal | string>;
  nutrition_analysis: {
    total_calories_approx?: number;
    protein_quality?: "Low" | "Medium" | "High";
    strengths: string[];
    weaknesses: string[];
    missing_nutrients?: string[];
  };
  tradeoffs?: string;
  cheap_substitutions?: Array<{
    item: string;
    reason: string;
    estimated_cost: string;
  }>;
  practical_tips?: string;
}
