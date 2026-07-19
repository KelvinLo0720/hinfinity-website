"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLanguage } from "./i18n";

const images = [
  { src: "/images/team-phone.jpg", altZh: "青年參加者在小組中一起查看手機內容", altEn: "Young participants reviewing content together", className: "collage-a" },
  { src: "/images/participant-pitch.jpg", altZh: "參加者在 H Infinity 活動中分享構思", altEn: "A participant presenting an idea at H Infinity", className: "collage-b" },
  { src: "/images/group-conversation.jpg", altZh: "參加者圍坐交流", altEn: "Participants in a group conversation", className: "collage-c" }
];

export function PhotoCollage() {
  const { language } = useLanguage();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 20 });
  const rotateX = useTransform(smoothY, [-1, 1], [3.2, -3.2]);
  const rotateY = useTransform(smoothX, [-1, 1], [-3.2, 3.2]);

  return (
    <motion.div
      className="hero-collage"
      aria-label={language === "zh" ? "H Infinity 活動片段拼貼" : "H Infinity activity collage"}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
    >
      <motion.span className="collage-orbit collage-orbit-a" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
      <motion.span className="collage-orbit collage-orbit-b" animate={{ rotate: -360 }} transition={{ duration: 17, repeat: Infinity, ease: "linear" }} />
      {images.map((image, index) => (
        <motion.figure
          key={image.src}
          className={`collage-photo ${image.className}`}
          initial={{ opacity: 0, y: 35, rotate: index === 1 ? 5 : -4, scale: .96 }}
          animate={{ opacity: 1, y: 0, rotate: index === 1 ? 2 : index === 2 ? -2 : -4, scale: 1 }}
          transition={{ duration: 0.78, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotate: 0, scale: 1.035, zIndex: 5 }}
        >
          <Image src={image.src} alt={language === "zh" ? image.altZh : image.altEn} fill sizes="(max-width: 700px) 70vw, 360px" />
        </motion.figure>
      ))}
      <motion.span className="scribble-word word-idea" initial={{ opacity: 0, scale: 0.6, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: -5 }} transition={{ delay: 0.85, type: "spring" }}>IDEA!</motion.span>
      <motion.span className="scribble-word word-cool" initial={{ opacity: 0, scale: 0.6, rotate: 12 }} animate={{ opacity: 1, scale: 1, rotate: 4 }} transition={{ delay: 1, type: "spring" }}>COOL?</motion.span>
      <motion.span className="scribble-word word-impact" initial={{ opacity: 0, scale: 0.6, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} transition={{ delay: 1.15, type: "spring" }}>IMPACT</motion.span>
      <svg className="collage-doodle" viewBox="0 0 600 500" aria-hidden="true">
        <motion.path d="M40 90C110 12 220 120 310 57C385 4 463 59 555 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 1.4 }} />
        <motion.path d="M130 390C172 330 235 420 290 352C333 299 408 357 490 311" fill="none" stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1.2 }} />
      </svg>
    </motion.div>
  );
}
