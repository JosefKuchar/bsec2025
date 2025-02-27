import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { goalSchema } from "./form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {
  const goals = await prisma.goal.findMany();

  return {
    goals,
    form: await superValidate(zod(goalSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(goalSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

	console.log('Action')
	console.log(form.data);

    // Save the new goal to the database
    try {
      const newGoal = await prisma.goal.create({
        data: {
          type: Number(form.data.type),
          value: Number(form.data.value),
          name: form.data.name,
          description: form.data.description,
          changeTypeId: form.data.changeTypeId || null, // Handle optional changeTypeId
        },
      });

      // Return the form and the new goal (optional)
      return {
        form,
        newGoal,
      };
    } catch (error) {
      console.error("Failed to create goal:", error);
      return fail(500, { form, error: "Failed to create goal" });
    }
  },
};