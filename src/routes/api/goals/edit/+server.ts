import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const PUT: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const { id, name, description, amount } = data;

    // convert amount from string to float
    const value = parseFloat(amount);

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    try {
        // Update the goal in the database
        const updatedGoal = await prisma.goal.update({
            where: { id: Number(id) }, // Ensure ID is properly formatted
            data: { name, description, value }
        });

        return new Response(JSON.stringify(updatedGoal), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });
    } catch (error) {
        console.error('Update error:', error);
        return new Response(JSON.stringify({ error: 'Failed to update goal' }), { status: 500 });
    }
};
