import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
    const { id } = params;

    try {
        // Delete the change with the given ID
        await prisma.change.delete({
            where: { id: Number(id) }, // Ensure the ID is a number
        });

        return new Response(JSON.stringify({ message: 'Change deleted successfully' }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete change' }), {
            status: 500,
        });
    }
};