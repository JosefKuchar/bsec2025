import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

interface CategorySummary {
	id: number;
	name: string;
	emoji: string;
	amount: number;
	isIncome: boolean;
}

interface PaymentSummary {
	positiveAmount: number;
	negativeAmount: number;
	netAmount: number;
	categories: CategorySummary[];
}

async function calculateOneTimePayments(year: number, month: number): Promise<PaymentSummary> {
	var startDate = new Date(year, month - 1, 2);
	var endDate = new Date(year, month, 1);

	const changes = await prisma.change.findMany({
		where: {
			from: {
				gte: startDate,
				lte: endDate
			}
		},
		include: {
			type: true
		}
	});

	let positiveAmount = 0;
	let negativeAmount = 0;
	const categoryMap = new Map<number, CategorySummary>();

	for (const change of changes) {
		if (change.type.dir === 1) {
			positiveAmount += change.amount;
		} else {
			negativeAmount += change.amount;
		}

		const typeId = change.type.id;
		if (!categoryMap.has(typeId)) {
			categoryMap.set(typeId, {
				id: typeId,
				name: change.type.name,
				emoji: change.type.emoji,
				amount: 0,
				isIncome: change.type.dir === 1
			});
		}

		const category = categoryMap.get(typeId)!;
		category.amount += change.amount;
	}

	const categories = Array.from(categoryMap.values());
	categories.sort((a, b) => b.amount - a.amount);

	return {
		positiveAmount,
		negativeAmount,
		netAmount: positiveAmount - negativeAmount,
		categories
	};
}

export const load = (async () => {
	const goals = await prisma.goal.findMany();

	let months = [];
	for (let year = 2023; year <= 2024; year++) {
		for (let month = 1; month <= 12; month++) {
			const payments = await calculateOneTimePayments(year, month);
			months.push(payments);
		}
	}

	return {
		goals,
		months
	};
}) satisfies PageServerLoad;
