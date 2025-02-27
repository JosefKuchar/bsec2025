import { z } from 'zod';

export const formSchema = z.object({
	id: z.number().int().positive().optional(), // Optional because it's auto-generated
	amount: z.number(), // Assuming value is a float
  from: z.date(), // Optional because it's auto-generated
  to: z.date(),
	type: z.object({
		name: z.string().min(1).max(255),
		emoji: z.string().min(1).max(1),
		id: z.number().int().positive().optional()
	}), // Assuming name is a string with a max length of 255
	description: z.string().min(1).max(1000), // Assuming description is a string with a max length of 1000
});

export type ChangeFormSchema = typeof formSchema;
