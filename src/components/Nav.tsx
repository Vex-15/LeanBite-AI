"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Nav() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm transition-gentle">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/"
            className="text-lg font-bold text-[#111827] transition-calm hover:text-[#111827]/80 focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:ring-offset-2 rounded"
          >
            LeanBite AI
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/plan"
            className="text-sm text-[#111827]/70 transition-calm hover:text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:ring-offset-2 rounded px-2 py-1 -mx-2 -my-1"
          >
            Plan My Meals
          </Link>
        </motion.div>
      </nav>
    </header>
  );
}
