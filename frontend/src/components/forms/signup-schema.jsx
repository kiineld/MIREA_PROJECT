import * as z from "zod"

export const signupSchema = z
    .object({
        username: z.string().min(1, "Username is required").max(30),
        email: z.email("Enter a valid email."),
        password1: z.string().min(8, "Password must be at least 8 characters."),
        password2: z.string().min(8, "Confirm your password."),
    })
    .refine((data) => data.password1 === data.password2, {
        message: "Passwords do not match.",
        path: ["password2"], // show the error under password2
    })


