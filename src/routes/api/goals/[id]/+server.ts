import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;

    try {
        const goal = await prisma.goal.findUnique({
            where: { id: Number(id) }, // Adjust if your ID is a string
        });

        if (!goal) {
            return new Response(JSON.stringify({ error: 'Goal not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(goal), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};