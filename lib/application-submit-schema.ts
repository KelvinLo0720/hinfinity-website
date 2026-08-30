import { z } from "zod";
import {
  institutionOptions,
  yearOfStudyOptions
} from "@/lib/application-options";

export const applicantSchema = z.object({
  chineseName: z.string().trim().min(1).max(120),
  englishName: z.string().trim().min(1).max(160),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(320),

  // Strict allow-list: values outside the approved institution list are rejected.
  institution: z.enum(institutionOptions),

  programme: z.string().trim().min(1).max(240),

  // Strict allow-list for year of study.
  yearOfStudy: z.enum(yearOfStudyOptions),

  cvFileName: z.string().max(255).default(""),
  cvFileSize: z.number().nonnegative().default(0)
});

export const applicationSchema = z.object({
  applicationType: z.enum(["individual", "team"]),
  applicants: z.array(applicantSchema).min(1).max(4),
  q1: z.string().trim().min(1).max(6000),
  q2: z.string().trim().min(1).max(6000),
  q3: z.string().trim().min(1).max(9000),
  q4: z.string().trim().min(1).max(6000),
  q5: z.string().trim().min(1).max(6000),
  q6: z.string().trim().max(5000),
  accuracyDeclaration: z.literal(true),
  privacyConsent: z.literal(true)
}).superRefine((value, context) => {
  if (
    value.applicationType === "individual" &&
    value.applicants.length !== 1
  ) {
    context.addIssue({
      code: "custom",
      path: ["applicants"],
      message: "個人申請只能有一位申請者。"
    });
  }

  if (
    value.applicationType === "team" &&
    (value.applicants.length < 2 || value.applicants.length > 4)
  ) {
    context.addIssue({
      code: "custom",
      path: ["applicants"],
      message: "團隊申請必須有 2 至 4 位申請者。"
    });
  }
});
