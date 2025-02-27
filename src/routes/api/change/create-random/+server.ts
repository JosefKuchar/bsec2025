import prisma from '$lib/prisma';

export async function POST() {
	try {
		const now = new Date();

		const newChange = await prisma.change.create({
			data: {
				from: now,
				to: now,
				amount: Math.random() * 100, // Example: Random amount between 0 and 100
				typeId: 1
			}
		});

		return new Response();
	} catch (error) {
		console.error('Error creating random change:', error);
	}
}
