import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const currentDateParam = url.searchParams.get('currentDate');
    const currentDate = currentDateParam ? new Date(currentDateParam) : new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    startDate.setHours(0, 0, 0, 0);

    console.log(startDate.toLocaleString());
    console.log(currentDate.toLocaleString());

    const changes = await prisma.change.findMany({
      where: {
        from: {
          lte: currentDate,
          gte: startDate
        }
      },
      include: {
        type: true
      }
    });

    let balance = 0;
    for (const change of changes) {
      balance += change.type.dir === 1 ? change.amount : -change.amount;
    }

    return json({ balance });
  } catch (error) {
    console.error('Error calculating balance:', error);
    return json(
      { error: 'Failed to retrieve account balance' },
      { status: 500 }
    );
  }
};