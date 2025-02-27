import prisma from '$lib/prisma';
import moment from 'moment';
import type { PageServerLoad } from './$types';
import { getFrequencyString } from '$lib/utils';

export const load = (async () => {
	const changes = await prisma.change.findMany();

	return { changes: changes.map((change) => ({
		...change,
		frequency: getFrequencyString(change.frequency),
		from : moment(change.from).format('DD.MM.YYYY'),
		to : moment(change.to).format('DD.MM.YYYY'),
	}))};
}) satisfies PageServerLoad;
