import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const data = await event.request.json();
	delete data.id;
	await prisma.change.create({
		data: {
			...data
		}
	});
	return new Response();
};
