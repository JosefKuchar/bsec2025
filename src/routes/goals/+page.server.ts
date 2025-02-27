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
		form: await superValidate(zod(goalSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
	  const form = await superValidate(event, zod(goalSchema));
	  if (!form.valid) {
		return fail(400, {
		  form,
		});
	  }
	  return {
		form,
	  };
	},
  };
