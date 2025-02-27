import prisma from '$lib/prisma';
import moment from 'moment';
import type { PageServerLoad } from './$types';
import { getFrequencyString } from '$lib/utils';

export const load = (async () => {
	const changes = await prisma.change.findMany({
		select: {
			id: true,
			from: true,
			to: true,
			amount: true,
			frequency: true,
			type: {
				select: {
					id: true,
					emoji: true,
					name: true
				}
			}
		}
	});

	return {
		changes: changes.map((change) => ({
			id: change.id,
			from: moment(change.from).format('DD.MM.YYYY'),
			to: moment(change.to).format('DD.MM.YYYY'),
			amount: change.amount,
			frequency: getFrequencyString(change.frequency),
			type: {
				id: change.type.id,
				emoji: change.type.emoji,
				name: change.type.name
			}
		}))
	};
}) satisfies PageServerLoad;
