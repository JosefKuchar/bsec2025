import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function POST() {
  try {
    const now = new Date();

    const newChange = await prisma.change.create({
       {
        date: now,
        description: 'Random Change', // You might want to generate a more meaningful description
        amount: Math.random() * 100, // Example: Random amount between 0 and 100
        changeTypeId: 1, // Example: Default change type.  You might want to randomize this or pass it in the request.
      },
    });

    return json({ success: true,  newChange });
  } catch (error) {
    console.error('Error creating random change:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
