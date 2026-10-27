import type { MetadataRoute } from "next";

const BASE_URL = "https://hinfinityhk.com";

export default function sitemap(): MetadataRoute.Sitemap {
  /**
   * TEMPORARY:
   * Cohort 01 / previous-project routes, the current Media archive,
   * and the People page are intentionally excluded while the public
   * archive is hidden for banking / due-diligence processing.
   */
  const staticRoutes = [
    "",
    "/about",
    "/h-infinity",
    "/partners",
    "/support",
    "/contact",
    "/privacy",
    "/apply"
  ];

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency:
      route === "" || route === "/apply"
        ? ("weekly" as const)
        : ("monthly" as const),
    priority:
      route === ""
        ? 1
        : route === "/apply"
          ? 0.95
          : 0.7
  }));
}
