import { z } from "zod";

export const SPECIALTY_OPTIONS = ["Internal Medicine", "Other / discuss with us"] as const;
export const CHALLENGE_OPTIONS = ["Denials", "A/R follow-up", "Coding review", "Eligibility / authorizations", "End-to-end billing", "Other"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid work email.").max(150),
  practice: z.string().trim().min(2, "Please enter your practice or organization.").max(150),
  phone: z.string().trim().max(30).regex(/^[0-9+()\-.\s]*$/, "Use digits and + ( ) - only.").optional().or(z.literal("")),
  specialty: z.enum(SPECIALTY_OPTIONS),
  ehr: z.string().trim().max(100).optional().or(z.literal("")),
  challenge: z.enum(CHALLENGE_OPTIONS),
  message: z.string().trim().max(1500, "Please keep this under 1,500 characters.").optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent to be contacted." }) }),
});
export type LeadInput = z.infer<typeof leadSchema>;
