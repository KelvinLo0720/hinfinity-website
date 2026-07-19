"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Localized, useLanguage } from "./i18n";

const stories = [
  {
    src: "/images/team-phone.jpg",
    zh: "由一個問題開始",
    en: "Start with one question",
    altZh: "青年參加者在小組中一起查看手機內容",
    altEn: "Young participants reviewing content together"
  },
  {
    src: "/images/participant-pitch.jpg",
    zh: "勇敢講出構思",
    en: "Put the idea into words",
    altZh: "參加者在 H Infinity 活動中分享構思",
    altEn: "A participant presenting an idea at H Infinity"
  },
  {
    src: "/images/group-conversation.jpg",
    zh: "同路人一齊實踐",
    en: "Build it with others",
    altZh: "參加者圍坐交流",
    altEn: "Participants in a group conversation"
  }
] as const;

export function MobileStoryReel() {
  const { language } = useLanguage();
  return (
    <div className="mobile-story-reel" aria-label={language === "zh" ? "H Infinity 活動故事" : "H Infinity activity stories"}>
      <div className="mobile-story-track">
        {stories.map((story, index) => (
          <motion.figure
            key={story.src}
            className="mobile-story-card"
            initial={{ opacity: 0, y: 24, rotate: index % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 1 : -1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-story-image">
              <Image
                src={story.src}
                alt={language === "zh" ? story.altZh : story.altEn}
                fill
                sizes="82vw"
              />
            </div>
            <figcaption>
              <span>0{index + 1}</span>
              <Localized zh={story.zh} en={story.en} />
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <div className="mobile-story-hint"><i aria-hidden="true">↔</i><Localized zh="滑動睇更多" en="Swipe for more" /></div>
    </div>
  );
}
