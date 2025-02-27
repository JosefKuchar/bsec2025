import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import { startOfMonth, endOfMonth } from 'date-fns';

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
    var startDate = new Date(year, month-1, 2);
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

export const GET: RequestHandler = async ({ url }) => {
  try {
    const yearParam = url.searchParams.get('year');
    const monthParam = url.searchParams.get('month');

    if (!yearParam || !monthParam) {
      return new Response(
        JSON.stringify({ error: 'Year and month parameters are required' }), 
        { status: 400 }
      );
    }
    
    const year = parseInt(yearParam);
    const month = parseInt(monthParam);
    console.log(year);
    console.log(month);
    
    if (isNaN(year) || isNaN(month)) {
      return new Response(
        JSON.stringify({ error: 'Year and month must be valid numbers' }), 
        { status: 400 }
      );
    }
    
    const result = await calculateOneTimePayments(year, month);
    return json(result);
  } catch (error) {
    console.log('Error calculating payments:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to calculate payments' }), 
      { status: 500 }
    );
  }
};