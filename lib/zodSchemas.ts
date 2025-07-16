import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must be numeric"),
});

export const phoneFormSchema = z.object({
  countryCode: z.string().min(1, "Country code is required"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone must contain only numbers"),
});
