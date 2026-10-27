import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * TEMPORARY PUBLIC HIDE
 * Purpose: temporarily hide Cohort 01 / previous-project public content
 * during banking / due-diligence processing.
 *
 * Remove this file when the archive should become public again.
 */
export default function proxy(_request: NextRequest) {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}

export const config = {
  matcher: [
    "/projects/:path*",
    "/media",
    "/media/projects/:path*",
    "/first-chapter",
    "/stories",
    "/people"
  ]
};
