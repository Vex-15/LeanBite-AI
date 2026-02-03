"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, Calendar, TrendingUp, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, -0.05, 0.01, 0.99],
      duration: 0.6,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Typography */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] leading-tight">
                Recipe and Meal Plan App with AI
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg sm:text-xl text-[#111827]/80 leading-relaxed">
                Save time in planning meals according to available ingredients
                and help users to have a healthy or customized diet.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 flex-wrap"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/plan"
                  className="inline-flex items-center gap-2 bg-[#111827] text-white px-6 py-3.5 rounded-[2rem] font-medium transition-all hover:bg-[#1f2937]"
                >
                  Try for Free
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-[#a3e635] rounded-full flex items-center justify-center cursor-pointer"
              >
                <ArrowRight className="w-5 h-5 text-[#111827]" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-[2rem] p-8 shadow-lg">
              {/* Main Visual */}
              <div className="relative mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-lime-100 to-lime-50 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-[#a3e635]" />
                </div>
                <div className="absolute -top-4 -right-4 bg-[#a3e635] text-[#111827] px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Nutrition Analysis
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#a3e635] text-[#111827] px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Automatic Meal Plan
                </div>
              </div>

              {/* Required Recipe Card */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-[#111827] mb-3">
                  Required Recipe
                </h3>
                <div className="flex gap-2 mb-3">
                  {["07:00", "10:00", "13:00", "18:00"].map((time, idx) => (
                    <button
                      key={idx}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        idx === 0
                          ? "bg-[#111827] text-white"
                          : "bg-white text-[#111827]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <div className="w-full h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg" />
              </div>

              {/* Nutrients Card */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-[#111827] mb-1">
                  Nutrients required
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  nutrients needed in a day
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Calories", current: 1100, total: 2000 },
                    { label: "Carbohydrates", current: 300, total: 325 },
                    { label: "Proteins", current: 10, total: 75 },
                  ].map((nutrient, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#111827]">{nutrient.label}</span>
                        <span className="text-gray-500">
                          {nutrient.current}/{nutrient.total}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#a3e635] rounded-full transition-all"
                          style={{
                            width: `${(nutrient.current / nutrient.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-[#111827] font-medium">
            Don't forget to replenish the nutrients you need in a day.
          </p>
        </motion.div>
        <div className="flex justify-center gap-3 flex-wrap">
          {["Calories", "Carbohydrates", "Proteins", "Fat"].map((tag, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gray-200 text-[#111827] rounded-full text-sm font-medium"
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recipe Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[2rem] p-6 shadow-md overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#111827] mb-4">
              Recipe Search by Ingredient
            </h3>
            <div className="w-full h-48 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 rounded-xl" />
          </motion.div>

          {/* Automatic Meal Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[2rem] p-6 shadow-md overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#111827] mb-4">
              Automatic Meal Plan
            </h3>
            <div className="w-full h-48 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-16 h-16 text-[#a3e635]" />
            </div>
          </motion.div>

          {/* Integration Card - Navy Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            whileHover={{ y: -4 }}
            className="bg-[#111827] text-white rounded-[2rem] p-6 shadow-md lg:col-span-1 md:col-span-2"
          >
            <h3 className="text-xl font-bold mb-4">
              Integration with Calendar & Nutrition Analysis
            </h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Increase nutrition</span>
                  <span className="text-[#a3e635] font-bold">15%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#a3e635] rounded-full animate-glow"
                    style={{ width: "15%" }}
                  />
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <Calendar className="w-8 h-8 text-[#a3e635] mb-2" />
                <p className="text-sm opacity-80">Calendar Integration</p>
              </div>
            </div>
          </motion.div>

          {/* What you need card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[2rem] p-6 shadow-md md:col-span-2"
          >
            <h3 className="text-xl font-bold text-[#111827] mb-4">
              What you need we will provide
            </h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 bg-[#111827] text-white px-6 py-3 rounded-[2rem] font-medium"
              >
                Try for Free
                <div className="w-8 h-8 bg-[#a3e635] rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#111827]" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
