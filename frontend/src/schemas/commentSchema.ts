import * as z from "zod/v4";

export default z.object({
  body: z.string().min(1, "Comment cannot be empty"),
});
