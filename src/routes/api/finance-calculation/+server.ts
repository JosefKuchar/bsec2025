import prisma from '$lib/prisma';
import { startOfMonth, endOfMonth } from 'date-fns';

interface CategorySummary {
  id: number;
  name: string;
  emoji: string;
  amount: number;
}

interface PaymentSummary {
  positiveAmount: number;
  negativeAmount: number;
  netAmount: number;
  categories: CategorySummary[];
}

export async function calculateOneTimePayments(year: number, month: number): Promise<PaymentSummary> {
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(startDate);

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
                amount: 0
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