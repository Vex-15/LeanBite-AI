"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

const MEALS_PER_DAY = [1, 2, 3] as const;
const DIET_TYPES = [
  { value: "veg", label: "Vegetarian" },
  { value: "non-veg", label: "Non-vegetarian" },
] as const;
const GOALS = [
  { value: "survival", label: "Survival" },
  { value: "balanced", label: "Balanced" },
  { value: "energy", label: "Energy" },
] as const;

export interface MealPlanFormPayload {
  availableFoods: string;
  budget: number;
  mealsPerDay: number;
  dietType: string;
  goal: string;
}

interface MealPlanFormProps {
  onSubmit: (payload: MealPlanFormPayload) => void;
  disabled?: boolean;
}

function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded animate-skeleton" />
        <div className="h-24 w-full bg-gray-100 rounded-xl animate-skeleton" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 rounded animate-skeleton" />
        <div className="h-10 w-40 bg-gray-100 rounded-xl animate-skeleton" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-200 rounded animate-skeleton" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-16 bg-gray-100 rounded-lg animate-skeleton"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
      <div className="h-12 w-full bg-gray-200 rounded-xl animate-skeleton" />
    </div>
  );
}

export function MealPlanForm({ onSubmit, disabled }: MealPlanFormProps) {
  const [availableFoods, setAvailableFoods] = useState("");
  const [budget, setBudget] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState<number>(2);
  const [dietType, setDietType] = useState<string>("veg");
  const [goal, setGoal] = useState<string>("balanced");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const hasFoodInput = availableFoods.trim().length > 0;
  const budgetNum = budget === "" ? 0 : Number(budget);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasFoodInput || disabled) return;
    onSubmit({
      availableFoods: availableFoods.trim(),
      budget: budgetNum,
      mealsPerDay,
      dietType,
      goal,
    });
  };

  if (disabled) {
    return (
      <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-md">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-md transition-all hover:shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#111827] mb-6">
        Request Your Meal Plan
      </h2>

      <div className="space-y-6">
        {/* Available Foods */}
        <div className="relative">
          <motion.textarea
            id="availableFoods"
            name="availableFoods"
            rows={4}
            value={availableFoods}
            onChange={(e) => setAvailableFoods(e.target.value)}
            onFocus={() => setFocusedField("availableFoods")}
            onBlur={() => setFocusedField(null)}
            placeholder=" "
            whileFocus={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            className="peer w-full rounded-xl bg-gray-50 px-4 pt-6 pb-2 text-[#111827] placeholder-transparent transition-all focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:ring-opacity-50"
            required
          />
          <label
            htmlFor="availableFoods"
            className={`floating-label ${
              focusedField === "availableFoods" || availableFoods
                ? "floating-label-focused"
                : ""
            }`}
          >
            What food do you have?
          </label>
          <p className="mt-1.5 text-xs text-gray-500 px-1">
            List ingredients you have (e.g. rice, eggs, onions, dal). We only
            use these.
          </p>
        </div>

        {/* Budget */}
        <div className="relative max-w-[200px]">
          <motion.input
            id="budget"
            name="budget"
            type="number"
            min={0}
            step={10}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            onFocus={() => setFocusedField("budget")}
            onBlur={() => setFocusedField(null)}
            placeholder=" "
            whileFocus={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            className="peer w-full rounded-xl bg-gray-50 px-4 pt-6 pb-2 text-[#111827] placeholder-transparent transition-all focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:ring-opacity-50"
          />
          <label
            htmlFor="budget"
            className={`floating-label ${
              focusedField === "budget" || budget ? "floating-label-focused" : ""
            }`}
          >
            Budget (₹)
          </label>
        </div>

        {/* Meals per day */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-3">
            Meals per day
          </label>
          <div className="flex gap-2">
            {MEALS_PER_DAY.map((n) => (
              <motion.button
                key={n}
                type="button"
                onClick={() => setMealsPerDay(n)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  mealsPerDay === n
                    ? "bg-[#111827] text-white"
                    : "bg-gray-50 text-[#111827] hover:bg-gray-100"
                }`}
              >
                {n}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Diet Type */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-3">
            Diet type
          </label>
          <div className="flex gap-2">
            {DIET_TYPES.map(({ value, label }) => (
              <motion.button
                key={value}
                type="button"
                onClick={() => setDietType(value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  dietType === value
                    ? "bg-[#111827] text-white"
                    : "bg-gray-50 text-[#111827] hover:bg-gray-100"
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-3">
            Goal
          </label>
          <div className="flex gap-2 flex-wrap">
            {GOALS.map(({ value, label }) => (
              <motion.button
                key={value}
                type="button"
                onClick={() => setGoal(value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 min-w-[100px] rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  goal === value
                    ? "bg-[#111827] text-white"
                    : "bg-gray-50 text-[#111827] hover:bg-gray-100"
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={!hasFoodInput}
            whileHover={!hasFoodInput ? {} : { scale: 1.02 }}
            whileTap={!hasFoodInput ? {} : { scale: 0.98 }}
            className="w-full rounded-xl bg-[#111827] text-white px-6 py-3.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {disabled ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Meal Plan
                <div className="w-6 h-6 bg-[#a3e635] rounded-full flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-[#111827]" />
                </div>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
