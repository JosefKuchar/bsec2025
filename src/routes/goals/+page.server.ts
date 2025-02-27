import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Mocked payment data
	const payments = [
		{
			id: 'payment-1',
			amount: 100,
			date: '2024-03-08',
			description: 'Payment for service'
		},
		{
			id: 'payment-2',
			amount: 50,
			date: '2024-03-07',
			description: 'Another payment'
		}
	];

	return {
		payments
	};
};
