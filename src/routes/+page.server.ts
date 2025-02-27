import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const goals = await prisma.goal.findMany();

	return {
		goals
	};
}) satisfies PageServerLoad;
