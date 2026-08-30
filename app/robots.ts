import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"]
    },
    sitemap: "https://hinfinityhk.com/sitemap.xml",
    host: "https://hinfinityhk.com"
  };
}
