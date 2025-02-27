import { z } from "zod";

export const formSchema = z.object({
  id: z.number().int().positive().optional(), 
  typeId: z.number().int(), 
  frequency: z.enum(["OneTime", "Daily", "Weekly", "Monthly", "Yearly"]), 
  amount: z.number(),
  from: z.date(),
  to: z.date(),
});

export type ChangeFormSchema = typeof formSchema;