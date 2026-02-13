"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  Leaf,
  Beef,
  Utensils,
  X,
} from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
    },
  },
};

export default function HomePage() {
  return (
    // UPDATED BACKGROUND HERE:
    // Added radial-gradient dot pattern and background-size for that "Tech Grid" look
    <div className="min-h-screen bg-[#F3F4F6] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] text-[#111827] font-sans selection:bg-[#a3e635] selection:text-[#111827]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Typography & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h1
              variants={cardVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              Recipe and <br />
              Meal Plan App <br />
              with AI
            </motion.h1>

            <motion.p
              variants={cardVariants}
              className="text-lg text-gray-500 leading-relaxed max-w-lg bg-[#F3F4F6]/80 backdrop-blur-sm rounded-lg p-2"
            >
              Get personalized meal suggestions based on the ingredients you
              have. Choose your diet preference and get detailed health pros &
              cons.
            </motion.p>

            <motion.div
              variants={cardVariants}
              className="flex items-center gap-4 flex-wrap"
            >
              <Link
                href="/plan"
                className="group relative inline-flex items-center gap-3 bg-[#111827] text-white px-8 py-4 rounded-[2rem] font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gray-200"
              >
                Try for Free
                <div className="w-6 h-6 bg-[#a3e635] rounded-full flex items-center justify-center text-[#111827] transition-transform group-hover:rotate-45">
                  <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: Floating UI Cards (Hero Composition) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block h-[500px]"
          >
            {/* 1. Main Visual (Abstract Food Plate) */}
            <div className="absolute top-0 right-4 w-[90%] h-[350px] bg-white rounded-[2.5rem] shadow-xl p-3 border border-gray-100">
              <div className="w-full h-full bg-gray-50 rounded-[2rem] relative overflow-hidden flex items-center justify-center group">
                <div className="w-48 h-48 bg-gradient-to-tr from-orange-100 to-amber-50 rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-700">
                  <Utensils className="w-16 h-16 text-orange-300 opacity-50" />
                </div>
                {/* Floating Labels */}
                <div className="absolute top-8 left-8 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-xs font-bold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#a3e635]" /> Low Carb
                </div>
                <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-xs font-bold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#a3e635]" /> High
                  Protein
                </div>
              </div>
            </div>

            {/* 2. "Diet Choice" Mini Card */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute bottom-10 left-0 w-[240px] bg-white p-5 rounded-[2rem] shadow-2xl border border-gray-100 z-20"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-full text-green-700">
                  <Leaf size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">
                    Vegetarian
                  </h4>
                  <p className="text-[10px] text-gray-400">Diet Preference</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-2">
                <div className="h-full w-full bg-green-500 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Middle Stats Section --- */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-center gap-3 flex-wrap">
          {["Proteins", "Vitamins", "Carbs", "Iron", "Fiber"].map(
            (tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium shadow-sm hover:border-[#a3e635] hover:text-[#111827] transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ),
          )}
        </div>
      </section>

      {/* --- Bento Grid Section (Your Specific Features) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* FEATURE 1: Ingredient Search */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] p-7 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#111827]">
                Ingredient Based
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Cook with what you have
              </p>
            </div>

            {/* Visual: Search Bar & Tags */}
            <div className="bg-white rounded-2xl p-4 h-40 flex flex-col justify-between border border-gray-50 relative overflow-hidden">
              <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 border border-gray-100 shadow-inner">
                <Search className="w-4 h-4 text-gray-400" />
                <div className="text-xs text-gray-400">
                  e.g. Rice, Potatoes...
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {["Rice", "Potatoes", "Onion"].map((ing) => (
                  <div
                    key={ing}
                    className="bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 flex items-center gap-1 shadow-sm hover:border-[#a3e635] transition-colors"
                  >
                    {ing} <X size={10} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FEATURE 2: Veg / Non-Veg Choice */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] p-7 shadow-sm border border-gray-100 hover:shadow-md transition-all relative"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#111827]">Diet Choice</h3>
              <p className="text-sm text-gray-400 mt-1">
                Veg or Non-Veg options
              </p>
            </div>

            {/* Visual: Toggle Switch Mockup */}
            <div className="bg-gray-50 rounded-2xl h-40 flex flex-col items-center justify-center gap-4 border border-gray-100">
              <div className="flex gap-4 w-full px-6">
                {/* Veg Option (Active) */}
                <div className="flex-1 bg-white border-2 border-[#a3e635] rounded-xl p-3 flex flex-col items-center gap-2 shadow-sm cursor-pointer">
                  <Leaf size={20} className="text-green-600" />
                  <span className="text-xs font-bold text-[#111827]">Veg</span>
                </div>
                {/* Non-Veg Option (Inactive) */}
                <div className="flex-1 bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center gap-2 opacity-50 cursor-pointer">
                  <Beef size={20} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-400">
                    Non-Veg
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-gray-400 font-medium">
                Click to toggle preference
              </div>
            </div>
          </motion.div>

          {/* FEATURE 3: Health Pros & Cons (Dark Card) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-[#111827] text-white rounded-[2rem] p-7 shadow-lg lg:col-span-1 md:col-span-2 relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#a3e635] rounded-full blur-[90px] opacity-10" />

            <div className="mb-6 relative z-10">
              <h3 className="text-xl font-bold">Health Insights</h3>
              <p className="text-sm text-gray-400 mt-2">
                Smart Pros & Cons analysis
              </p>
            </div>

            {/* Visual: Pros & Cons List */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {/* Pros */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-2 mb-3 text-[#a3e635]">
                  <CheckCircle2 size={14} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Pros
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-16 bg-white/20 rounded-full" />
                  <div className="h-1.5 w-20 bg-white/20 rounded-full" />
                  <div className="h-1.5 w-12 bg-white/20 rounded-full" />
                </div>
              </div>

              {/* Cons */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-2 mb-3 text-orange-400">
                  <AlertCircle size={14} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Cons
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-24 bg-white/10 rounded-full" />
                  <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#111827] mb-2">
                Ready to cook smarter?
              </h3>
              <p className="text-gray-500">
                Generate a balanced meal plan with ingredients you already have.
              </p>
            </div>

            <Link
              href="/plan"
              className="inline-flex items-center gap-2 bg-[#111827] text-white pl-6 pr-2 py-2 rounded-full font-medium hover:bg-black transition-all hover:scale-105 shadow-xl shadow-gray-200"
            >
              Generate Plan
              <div className="w-10 h-10 bg-[#a3e635] rounded-full flex items-center justify-center text-[#111827]">
                <ArrowRight size={18} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
