import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function seedChangeTypes(records: any[]) {
	for (const record of records) {
		if (record.ChangeType) {
			await prisma.changeType.upsert({
				where: { name: record.name },
				update: {},
				create: {
					emoji: record.emoji,
					name: record.name,
					dir: parseInt(record.dir, 10)
				}
			});
		}
	}
}

async function seedChanges(records: any[]) {
	for (const record of records) {
		if (record.Change) {
			await prisma.change.upsert({
				where: { id: parseInt(record.id, 10) },
				update: {},
				create: {
					typeId: parseInt(record.typeId, 10),
					frequency: parseInt(record.frequency, 10),
					amount: parseInt(record.amount, 10),
					from: new Date(record.from),
					to: new Date(record.to)
				}
			});
		}
	}
}

async function seedGoals(records: any[]) {
	for (const record of records) {
		if (record.Goal) {
			await prisma.goal.upsert({
				where: { name: record.name },
				update: {},
				create: {
					type: parseInt(record.type, 10),
					value: parseFloat(record.value),
					name: record.name,
					description: record.description,
					changeTypeId: record.changeTypeId ? parseInt(record.changeTypeId, 10) : null
				}
			});
		}
	}
}

async function main() {
	const csvData = fs.readFileSync('data/seed.csv', 'utf8');

	parse(
		csvData,
		{
			columns: true,
			skip_empty_lines: true
		},
		async (err, records) => {
			if (err) {
				console.error(err);
				return;
			}

			await seedChangeTypes(records);
			await seedChanges(records);
			await seedGoals(records);
		}
	);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
