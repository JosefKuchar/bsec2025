import { prisma } from '$lib/prisma';
import { Frequency, type GoalType } from '$lib/enums';
import { addMonths, differenceInMonths, format, parseISO, startOfMonth } from 'date-fns';

/**
 * Calculates monthly expenses based on goals and changes data
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 * @returns Array of monthly expense objects with date and amount
 */
export async function calculateMonthlyExpenses(startDate: string, endDate: string) {
    const [changes, goals] = await Promise.all([
        prisma.change.findMany(),
        prisma.goal.findMany()
    ]);

    const months = differenceInMonths(parseISO(endDate), parseISO(startDate)) + 1;
    const monthlyExpenses: { month: string; amount: number }[] = [];

    // Process one-time expenses
    changes.forEach(change => {
        if (change.frequency === Frequency.OneTime) {
            const monthKey = format(parseISO(change.date.toString()), 'yyyy-MM');
            const existing = monthlyExpenses.find(e => e.month === monthKey);
            const amount = change.type === 'amount' ? change.value : change.value; // Add percentage calculation if needed
            
            if (existing) {
                existing.amount += amount;
            } else {
                monthlyExpenses.push({ month: monthKey, amount });
            }
        }
    });

    // Process recurring expenses (goals)
    goals.forEach(goal => {
        const baseDate = startOfMonth(parseISO(startDate));
        for (let i = 0; i < months; i++) {
            const currentMonth = addMonths(baseDate, i);
            const monthKey = format(currentMonth, 'yyyy-MM');
            
            // Calculate goal amount based on type
            let amount = 0;
            if ((goal.goalType === GoalType.DIFF && goal.currentValue < goal.targetValue) || 
                (goal.goalType === GoalType.CATEGORY_GT || goal.goalType === GoalType.CATEGORY_LT)) {
                amount = goal.monthlyTarget;
            }

            const existing = monthlyExpenses.find(e => e.month === monthKey);
            if (existing) {
                existing.amount += amount;
            } else {
                monthlyExpenses.push({ month: monthKey, amount });
            }
        }
    });

    return monthlyExpenses;
}

// Example endpoint usage
export async function GET({ url }) {
    const startDate = url.searchParams.get('start');
    const endDate = url.searchParams.get('end');
    
    if (!startDate || !endDate) {
        return new Response(JSON.stringify({ error: 'Missing date range' }), {
            status: 400
        });
    }

    try {
        const expenses = await calculateMonthlyExpenses(startDate, endDate);
        return new Response(JSON.stringify(expenses), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to calculate expenses' }), {
            status: 500
        });
    }
}
