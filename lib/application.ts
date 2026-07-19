import crypto from "node:crypto";

export const applicationSchemaVersion = "2026-demo-v1";

export function newResumeToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function referenceNumber() {
  return `HI-${new Date().getFullYear()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}
