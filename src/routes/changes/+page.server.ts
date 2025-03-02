import prisma from '$lib/prisma';
import moment from 'moment';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const changes = await prisma.change.findMany({
		select: {
			id: true,
			from: true,
			to: true,
			amount: true,
			type: {
				select: {
					id: true,
					emoji: true,
					name: true
				}
			}
		},
		orderBy: {
			from: 'desc'
		}
	});

	const types = await prisma.changeType.findMany();

	console.debug('changes:', changes);
	console.debug('types:', types);

	return {
		changes: changes.map((change) => ({
			id: change.id,
			to: change.to,
			from: change.from,
			amount: change.amount,
			type: {
				id: change.type.id,
				emoji: change.type.emoji,
				name: change.type.name
			}
		})),
		types: types.map((type) => ({
			id: type.id,
			emoji: type.emoji,
			name: type.name
		}))
	};
}) satisfies PageServerLoad;
