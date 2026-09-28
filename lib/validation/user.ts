import { z } from "zod";

export const signUpSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, {
            error: "Name must contain at least 2 characters.",
        })
        .max(100, {
            error: "Name cannot exceed 100 characters.",
        }),

    email: z
        .email({
            error: "Please enter a valid email address.",
        })
        .max(255, {
            error: "Email cannot exceed 255 characters.",
        })
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(8, {
            error: "Password must contain at least 8 characters.",
        })
        .max(128, {
            error: "Password cannot exceed 128 characters.",
        }),
});

export const loginSchema = z.object({
    email: z
        .email({
            error: "Please enter a valid email address.",
        })
        .max(255, {
            error: "Email cannot exceed 255 characters.",
        })
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(1, {
            error: "Password is required.",
        })
        .max(128, {
            error: "Password cannot exceed 128 characters.",
        }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;