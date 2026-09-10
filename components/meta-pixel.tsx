"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = "1592781462641332";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function createFbq(): Fbq {
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as Fbq;

  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";

  return fbq;
}

export function MetaPixel() {
  const pathname = usePathname();
  const firstPage = useRef(true);

  useEffect(() => {
    if (!window.fbq) {
      const fbq = createFbq();

      window.fbq = fbq;
      window._fbq = fbq;

      const script = document.createElement("script");
      script.id = "meta-pixel-script";
      script.async = true;
      script.src =
        "https://connect.facebook.net/en_US/fbevents.js";

      document.head.appendChild(script);
    }

    window.fbq?.("init", PIXEL_ID);
    window.fbq?.("track", "PageView");
  }, []);

  useEffect(() => {
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }

    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
