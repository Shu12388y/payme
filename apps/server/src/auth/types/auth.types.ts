import { z } from "zod";

export const AuthType = z.object({
  firstname: z.string(),
  lastname: z.string().optional(),
  email: z.string(),
  password: z.string(),
  phonenumber: z.string().min(10).max(10),
});
