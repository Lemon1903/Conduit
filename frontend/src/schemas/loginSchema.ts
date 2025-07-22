import * as z from "zod/v4";

export default z.object({
  email: z.email(),
  password: z.string().min(1, { error: "This field is required" }),
});
