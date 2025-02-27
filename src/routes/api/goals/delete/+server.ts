import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { z } from 'zod';

const deleteSchema = z.object({
    id: z.number().int().positive()
});

export async function DELETE({ request }) {
    const data = await request.json();
    const result = deleteSchema.safeParse(data);
    
    if (!result.success) {
        return json({ error: result.error.format() }, { status: 400 });
    }

    try {
        await prisma.goal.delete({
            where: { id: result.data.id }
        });
        return json({ success: true });
    } catch (error) {
        return json({ error: 'Failed to delete goal' }, { status: 500 });
    }
}
