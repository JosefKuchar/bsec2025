import type { PageServerLoad } from './$types';
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./form-schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
	// Mocked payment data
	const goals = [
		{
			id: 'payment-1',
			name: 'Payment 1',
            description: 'This is the first payment',
            type: 'percentage',
            value: 50
		},
		{
			id: 'payment-2',
			name: 'Payment 2',
            description: 'This is the second payment',
            type: 'amount',
            value: 100
		}
	];

	return {
		goals,
		form: await superValidate(zod(formSchema))
	};
};
