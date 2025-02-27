import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function seedChangeTypes() {
	const csvData = fs.readFileSync('data/changeType.csv', 'utf8');

	parse(
		csvData,
		{
			columns: true,
			skip_empty_lines: true
		},
		async (err, records) => {
			if (err) {
				console.error('Error parsing changeType.csv:', err);
				return;
			}

			for (const record of records) {
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
	);
}

async function seedChanges() {
	const csvData = fs.readFileSync('data/change.csv', 'utf8');

	parse(
		csvData,
		{
			columns: true,
			skip_empty_lines: true
		},
		async (err, records) => {
			if (err) {
				console.error('Error parsing change.csv:', err);
				return;
			}

			for (const record of records) {
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
	);
}

async function seedGoals() {
	const csvData = fs.readFileSync('data/goal.csv', 'utf8');

	parse(
		csvData,
		{
			columns: true,
			skip_empty_lines: true
		},
		async (err, records) => {
			if (err) {
				console.error('Error parsing goal.csv:', err);
				return;
			}

			for (const record of records) {
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
	);
}

async function main() {
	await seedChangeTypes();
	await seedChanges();
	await seedGoals();
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
