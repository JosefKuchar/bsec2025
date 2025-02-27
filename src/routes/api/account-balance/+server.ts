import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import { startOfToday } from 'date-fns';

export const GET: RequestHandler = async () => {
  try {
    const today = startOfToday();
    const changes = await prisma.change.findMany({
      where: {
        from: {
          lte: today
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