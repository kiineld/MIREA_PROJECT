import * as z from "zod"

export const loginSchema = z
    .object({
        email: z.email("Enter a valid email."),
        password: z.string().min(1, "Password must be at least 8 characters."),
    })