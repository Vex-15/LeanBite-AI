"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import type { MealPlanResponse } from "@/types/meal-plan";

interface MealPlanResultsProps {
  data: MealPlanResponse;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  }),
};

function renderMealDescription(description: unknown) {
  if (typeof description === "string") {
    return <p className="text-[#111827] leading-relaxed">{description}</p>;
  }

  if (
    typeof description === "object" &&
    description !== null &&
    "name" in description
  ) {
    const d = description as {
      name?: string;
      ingredients?: string[];
      protein_estimate?: string;
    };

    return (
      <div className="space-y-3">
        {d.name && (
          <h4 className="text-lg font-bold text-[#111827]">{d.name}</h4>
        )}

        {Array.isArray(d.ingredients) && d.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {d.ingredients.map((ingredient, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-[#111827]"
              >
                {ingredient}
              </span>
            ))}
          </div>
        )}

        {d.protein_estimate && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-lime-100 px-3 py-1 text-xs font-medium text-lime-800 border border-lime-200">
            <span>Protein:</span>
            <span className="font-semibold">{d.protein_estimate}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <p className="text-sm text-gray-500">Unable to display meal details.</p>
  );
}

export function MealPlanResults({
  data,
  className = "",
}: MealPlanResultsProps) {
  const {
    _thinking,
    meal_plan = {},
    nutrition_analysis = { strengths: [], weaknesses: [] },
    tradeoffs = "",
    cheap_substitutions = [],
    practical_tips = "",
  } = data;

  const meals = Object.entries(meal_plan).sort(
    (a, b) =>
      (Number(a[0].match(/\d+/)?.[0]) || 0) -
      (Number(b[0].match(/\d+/)?.[0]) || 0)
  );

  if (meals.length === 0) return null;

  return (
    <section
      className={`space-y-8 transition-subtle ${className}`}
      aria-label="Meal plan results"
    >
      {/* AI Strategy / Chef's Insight Card */}
      <AnimatePresence>
        {_thinking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border-2 border-lime-200 bg-lime-50/80 p-6 shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-[#a3e635] p-2">
                  <TrendingUp className="w-5 h-5 text-[#111827]" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#111827] mb-2">
                  Chef's Insight
                </h3>
                <p className="text-sm text-[#111827]/80 leading-relaxed">
                  {_thinking}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meal Plan Cards - Grid Layout with Staggered Animation */}
      <div className="space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-[#111827]"
        >
          Your Meal Plan
        </motion.h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {meals.map(([key, description], index) => (
              <motion.div
                key={key}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all hover:shadow-lg"
              >
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {key.replace(/_/g, " ")}
                </h3>
                {renderMealDescription(description)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Nutrition Analysis - Navy Card with Lime Progress Bars */}
      <AnimatePresence>
        {(nutrition_analysis.strengths?.length > 0 ||
          nutrition_analysis.weaknesses?.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: meals.length * 0.1 + 0.2,
              duration: 0.4,
            }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-[#111827]">
              Nutrition Analysis
            </h2>

            {/* Navy Card with Nutrition Info */}
            <div className="bg-[#111827] text-white rounded-2xl p-6 shadow-lg">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Strengths */}
                {nutrition_analysis.strengths?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-[#a3e635]" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide">
                        Strengths
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {nutrition_analysis.strengths.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-white/90"
                        >
                          <span className="mt-0.5 text-[#a3e635]">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {nutrition_analysis.weaknesses?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-[#a3e635]" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide">
                        Weaknesses
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {nutrition_analysis.weaknesses.map((w, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-white/90"
                        >
                          <span className="mt-0.5 text-[#a3e635]">•</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Progress Bars for Macros (if available) */}
              {nutrition_analysis.total_calories_approx && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-semibold mb-4">Daily Progress</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Calories</span>
                        <span className="text-[#a3e635]">
                          {nutrition_analysis.total_calories_approx} kcal
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#a3e635] rounded-full animate-glow"
                          style={{
                            width: `${Math.min(
                              (nutrition_analysis.total_calories_approx / 2000) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trade-offs Section */}
      <AnimatePresence>
        {tradeoffs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: meals.length * 0.1 + 0.5,
              duration: 0.4,
            }}
            className="rounded-2xl border-2 border-gray-300 bg-white p-6 shadow-md"
          >
            <h3 className="text-lg font-bold text-[#111827] mb-3">
              Reasoning & Trade-offs
            </h3>
            <p className="text-[#111827]/80 leading-relaxed">{tradeoffs}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Practical Tips */}
      <AnimatePresence>
        {practical_tips && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: meals.length * 0.1 + 0.6,
              duration: 0.4,
            }}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#111827] mb-3">
              Practical Tips
            </h3>
            <p className="text-[#111827]/80 leading-relaxed text-sm">
              {practical_tips}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional Substitutions */}
      <AnimatePresence>
        {cheap_substitutions && cheap_substitutions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: meals.length * 0.1 + 0.7,
              duration: 0.4,
            }}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#111827] mb-4">
              Optional Low-Cost Substitutions
            </h3>
            <ul className="space-y-4">
              {cheap_substitutions.map((sub, i) => (
                <li
                  key={i}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-[#111827]">
                      {sub.item}
                    </span>
                    <span className="text-sm text-[#111827]/70">
                      {sub.reason}
                    </span>
                    {sub.estimated_cost && (
                      <span className="mt-0.5 text-xs text-gray-500">
                        Est. {sub.estimated_cost}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
