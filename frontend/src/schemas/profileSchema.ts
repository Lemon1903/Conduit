import * as z from "zod/v4";

export default z.object({
  image: z
    .string()
    .nullable()
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: "Must be a valid URL",
    }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().nullable(),
  email: z.email(),
  password: z
    .string()
    .optional()
    .refine((password?: string) => !password || password.length >= 8, {
      message: "Password must be at least 8 characters.",
    })
    .refine((password?: string) => !password || /[A-Z]/.test(password), {
      message: "Password must contain an uppercase letter.",
    })
    .refine((password?: string) => !password || /[0-9]/.test(password), {
      message: "Password must contain a number.",
    })
    .refine((password?: string) => !password || /[!@#$%^&*]/.test(password), {
      message: "Password must contain a special character.",
    }),
});
