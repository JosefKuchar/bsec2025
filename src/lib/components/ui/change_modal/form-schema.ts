import { z } from "zod";

export const formSchema = z.object({
  id: z.number().int().positive().optional(), 
  type: z.string(), 
  amount: z.number(),
  from: z.date(),
  to: z.date(),
});

export type ChangeFormSchema = typeof formSchema;