import * as z from "zod/v4";

export default z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .min(6, {
      message: "Title must be at least 6 characters long",
    }),
  description: z
    .string()
    .min(1, {
      message: "Description is required",
    })
    .min(10, {
      message: "Description must be at least 10 characters long",
    })
    .max(200, {
      message: "Description must be at most 200 characters long",
    }),
  body: z.string().min(1, {
    message: "Body is required",
  }),
  tags: z.array(z.string()),
});
