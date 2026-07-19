"use client";

import Image from "next/image";
import { motion } from "motion/react";

const images = [
  { src: "/images/team-phone.jpg", alt: "青年參加者在小組中一起查看手機內容", className: "collage-a" },
  { src: "/images/participant-pitch.jpg", alt: "參加者在 H Infinity 活動中分享構思", className: "collage-b" },
  { src: "/images/group-conversation.jpg", alt: "參加者圍坐交流", className: "collage-c" }
];

export function PhotoCollage() {
  return (
    <div className="hero-collage" aria-label="H Infinity 活動片段拼貼">
      {images.map((image, index) => (
        <motion.figure
          key={image.src}
          className={`collage-photo ${image.className}`}
          initial={{ opacity: 0, y: 35, rotate: index === 1 ? 5 : -4 }}
          animate={{ opacity: 1, y: 0, rotate: index === 1 ? 2 : index === 2 ? -2 : -4 }}
          transition={{ duration: 0.7, delay: 0.15 + index * 0.12 }}
          whileHover={{ rotate: 0, scale: 1.025, zIndex: 5 }}
        >
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 70vw, 360px" />
        </motion.figure>
      ))}
      <motion.span className="scribble-word word-idea" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.85 }}>IDEA!</motion.span>
      <motion.span className="scribble-word word-cool" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}>COOL?</motion.span>
      <motion.span className="scribble-word word-impact" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.15 }}>IMPACT</motion.span>
      <svg className="collage-doodle" viewBox="0 0 600 500" aria-hidden="true">
        <motion.path d="M40 90C110 12 220 120 310 57C385 4 463 59 555 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 1.4 }} />
        <motion.path d="M130 390C172 330 235 420 290 352C333 299 408 357 490 311" fill="none" stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1.2 }} />
      </svg>
    </div>
  );
}
