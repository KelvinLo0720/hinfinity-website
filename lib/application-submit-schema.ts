import { z } from "zod";
import {
  institutionOptions,
  interviewTimePreferenceOptions,
  yearOfStudyOptions
} from "@/lib/application-options";

const phoneSchema = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) => {
      if (!/^\+?[\d\s()-]+$/.test(value)) return false;
      const digitCount = (value.match(/\d/g) || []).length;
      return digitCount >= 8 && digitCount <= 15;
    },
    "Invalid phone number"
  );

export const applicantSchema = z.object({
  chineseName: z.string().trim().min(1).max(120),
  englishName: z.string().trim().min(1).max(160),
  phone: phoneSchema,
  email: z.string().trim().email().max(320),
  institution: z.enum(institutionOptions),
  programme: z.string().trim().min(1).max(240),
  yearOfStudy: z.enum(yearOfStudyOptions),
  cvFileName: z.string().max(255).default(""),
  cvFileSize: z.number().nonnegative().default(0)
});

export const applicationSchema = z
  .object({
    applicationType: z.enum(["individual", "team"]),
    applicants: z.array(applicantSchema).min(1).max(4),
    interviewTimePreference: z
      .array(z.enum(interviewTimePreferenceOptions))
      .min(1)
      .max(4),
    q1: z.string().trim().min(1).max(6000),
    q2: z.string().trim().min(1).max(6000),
    q3: z.string().trim().min(1).max(9000),
    q4: z.string().trim().min(1).max(6000),
    q5: z.string().trim().min(1).max(6000),
    q6: z.string().trim().max(5000),
    accuracyDeclaration: z.literal(true),
    privacyConsent: z.literal(true)
  })
  .superRefine((value, context) => {
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

    if (
      value.interviewTimePreference.includes("Flexible") &&
      value.interviewTimePreference.length > 1
    ) {
      context.addIssue({
        code: "custom",
        path: ["interviewTimePreference"],
        message: "Flexible 不能與其他面試時段同時選擇。"
      });
    }
  });
