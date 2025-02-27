import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async (event) => {
	const data = await event.request.json();
	try {
		await prisma.change.update({
			where: {
				id: data.id
			},
			data: {
				amount: data.amount,
				from: new Date(data.from),
				to: new Date(data.to)
			}
		});
	} catch (e) {
		console.error(e);
	}
	return new Response();
};
