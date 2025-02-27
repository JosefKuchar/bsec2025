import { z } from "zod";

export const goalSchema = z.object({
  id: z.number().int().positive().optional(), // Optional because it's auto-generated
  type: z.string().min(1).max(255), // Assuming type is a string with a max length of 255
  value: z.number(), // Assuming value is a float
  name: z.string().min(1).max(255), // Assuming name is a string with a max length of 255
  description: z.string().min(1).max(1000), // Assuming description is a string with a max length of 1000
  changeTypeId: z.number().int().positive().optional(), // Optional because it's a relation and can be null
});

export type GoalSchema = typeof goalSchema;