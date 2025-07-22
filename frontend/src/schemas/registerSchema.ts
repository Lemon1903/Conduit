import * as z from "zod/v4";

export default z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain an uppercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain a number.",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Password must contain a special character.",
    }),
});
