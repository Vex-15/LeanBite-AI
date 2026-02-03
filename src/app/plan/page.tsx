"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MealPlanForm } from "@/components/MealPlanForm";
import { MealPlanResults } from "@/components/MealPlanResults";
import type { MealPlanResponse } from "@/types/meal-plan";

export default function PlanPage() {
  const [result, setResult] = useState<MealPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (payload: {
      availableFoods: string;
      budget: number;
      mealsPerDay: number;
      dietType: string;
      goal: string;
    }) => {
      setError(null);
      setResult(null);
      setLoading(true);
      try {
        const res = await fetch("/api/meal-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Something went wrong.");
          return;
        }
        setResult(data as MealPlanResponse);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">
            Generate Meal Plan
          </h1>
          <p className="mt-2 text-[#111827]/70">
            Enter what you have. We'll suggest meals and honest trade-offs.
          </p>
          <p className="mt-3 text-sm text-[#111827]/60">
            This doesn't need to be perfect. We work with what you actually
            have.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-8"
        >
          <MealPlanForm onSubmit={handleSubmit} disabled={loading} />
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-md px-6 py-8 text-center"
              role="status"
              aria-live="polite"
            >
              <p className="text-base font-medium text-[#111827]">
                Reasoning under constraints…
              </p>
              <p className="mt-2 text-sm text-[#111827]/60">
                Evaluating available foods and trade-offs.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-md"
              role="alert"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <MealPlanResults data={result} className="mt-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
