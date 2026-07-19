"use client";

import { motion } from "motion/react";

export function HandLine({ className = "" }: { className?: string }) {
  return (
    <svg className={`hand-line ${className}`} viewBox="0 0 600 90" aria-hidden="true">
      <motion.path
        d="M5 46C85 5 110 84 184 42C257 1 293 77 360 42C433 3 482 74 594 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <motion.circle cx="184" cy="42" r="7" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.65 }} />
      <motion.circle cx="360" cy="42" r="7" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }} />
    </svg>
  );
}
