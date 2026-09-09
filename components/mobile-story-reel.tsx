"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Localized,
  useLanguage
} from "./i18n";

const stories = [
  {
    src: "/images/home/home-hero-02.jpg",
    zh: "由一條問題開始",
    en: "Start with one question",
    altZh:
      "H Infinity 參加者以便利貼回應一條問題",
    altEn:
      "H Infinity participants responding to a question with sticky notes"
  },
  {
    src: "/images/home/home-realnotperfet.jpg",
    zh: "勇敢分享構思",
    en: "Share the idea with confidence",
    altZh:
      "H Infinity 參加者分享仍在發展中的構思",
    altEn:
      "An H Infinity participant sharing an idea still in development"
  },
  {
    src: "/images/home/home-hero-03-only3ppl.png",
    zh: "與同路人一齊實踐",
    en: "Put it into practice with others",
    altZh:
      "H Infinity 青年參加者圍在一起討論構思",
    altEn:
      "H Infinity participants discussing an idea together"
  }
] as const;

export function MobileStoryReel() {
  const { language } = useLanguage();

  return (
    <div
      className="mobile-story-reel"
      aria-label={
        language === "zh"
          ? "H Infinity 活動故事"
          : "H Infinity activity stories"
      }
    >
      <div className="mobile-story-track">
        {stories.map((story, index) => (
          <motion.figure
            key={story.src}
            className="mobile-story-card"
            initial={{
              opacity: 0,
              y: 24,
              rotate: index % 2 ? 2 : -2
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: index % 2 ? 1 : -1
            }}
            viewport={{
              once: true,
              margin: "-10%"
            }}
            transition={{
              delay: index * 0.08,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className="mobile-story-image">
              <Image
                src={story.src}
                alt={
                  language === "zh"
                    ? story.altZh
                    : story.altEn
                }
                fill
                sizes="82vw"
              />
            </div>

            <figcaption>
              <span>0{index + 1}</span>

              <Localized
                zh={story.zh}
                en={story.en}
              />
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mobile-story-hint">
        <i aria-hidden="true">↔</i>

        <Localized
          zh="滑動睇更多"
          en="Swipe for more"
        />
      </div>
    </div>
  );
}
