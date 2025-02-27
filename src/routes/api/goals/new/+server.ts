import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';
import { GoalType } from '$lib/enums';

export const POST: RequestHandler = async (event) => {
	const data = await event.request.json();
    const type: GoalType = parseInt(data.type);
    
    delete data.id;
    delete data.changeTypeId;
    switch (type){
        case GoalType.DIFF:
            data.changeTypeId = null;
            break;
        case GoalType.CATEGORY_GT:
        case GoalType.CATEGORY_LT:
            data.changeTypeId = parseInt(data.changeTypeId);
            break;
    }
    
	await prisma.change.create({
		data: {
			...data,
			changeType: {
				connect: {
					id: data.changeTypeId
				}
			}
		}
	});
	return new Response();
};