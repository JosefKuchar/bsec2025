import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async (event) => {
	const data = await event.request.json();
	console.log('api', data);
	try {
		await prisma.change.update({
			where: {
				id: data.id
			},
			data: {
				...data,
				from: new Date(data.from),
				to: new Date(data.to)
			}
		});
	} catch (e) {
		console.error(e);
	}
	return new Response();
};
