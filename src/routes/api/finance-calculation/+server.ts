import prisma from '$lib/prisma';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function calculateOneTimePayments(year: number, month: number) {
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(startDate);

    const changes = await prisma.change.findMany({
        where: {
            frequency: 1,
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

    for (const change of changes) {
        if (change.type.dir === 1) {
            positiveAmount += change.amount;
        } else {
            negativeAmount += change.amount;
        }
    }

    return {
        positiveAmount,
        negativeAmount,
        netAmount: positiveAmount - negativeAmount
    };
}