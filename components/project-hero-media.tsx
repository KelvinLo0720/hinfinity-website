"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Localized } from "@/components/i18n";

type ProjectVideo = {
  src: string;
  preview: string;
  poster: string;
  duration: string;
};

export function ProjectHeroMedia({
  image,
  alt,
  video
}: {
  image: string;
  alt: string;
  video?: ProjectVideo;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!video) return;
    const player = videoRef.current;
    if (!player) return;

    player.src = video.preview;
    player.muted = true;
    player.loop = true;
    player.controls = false;
    player.load();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) void player.play().catch(() => undefined);

    return () => player.pause();
  }, [video]);

  if (!video) {
    return (
      <div className="project-detail-image motion-card">
        <Image src={image} alt={alt} fill sizes="(max-width: 700px) 90vw, 560px" />
      </div>
    );
  }

  async function playFullVideo() {
    const player = videoRef.current;
    if (!player || loading) return;

    setLoading(true);
    player.pause();
    player.src = video.src;
    player.loop = false;
    player.muted = false;
    player.controls = true;
    player.currentTime = 0;
    player.load();
    setStarted(true);

    try {
      await player.play();
    } catch {
      // If a browser still blocks playback, native controls remain visible
      // so the visitor can start the video with one more tap.
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`project-detail-video motion-card ${started ? "is-playing" : ""}`}>
      <video
        ref={videoRef}
        className="project-detail-video-player"
        poster={video.poster}
        muted
        playsInline
        preload="metadata"
        aria-label={alt}
      />

      {!started && (
        <button
          className="project-video-play"
          type="button"
          onClick={() => void playFullVideo()}
          aria-label={`Play ${alt}`}
          disabled={loading}
        >
          <span className="project-video-play-icon" aria-hidden="true">▶</span>
          <span>
            <Localized zh={loading ? "載入中…" : "播放項目故事"} en={loading ? "Loading…" : "Play project story"} />
            <small>{video.duration}</small>
          </span>
        </button>
      )}
    </div>
  );
}
