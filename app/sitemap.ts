import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";

const BASE_URL = "https://hinfinityhk.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/h-infinity",
    "/first-chapter",
    "/projects",
    "/stories",
    "/people",
    "/partners",
    "/support",
    "/contact",
    "/privacy",
    "/apply"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      changeFrequency: route === "" || route === "/apply" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/apply" ? 0.95 : 0.7
    })),
    ...projects.map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65
    }))
  ];
}
