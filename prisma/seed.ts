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
				await prisma.changeType.create({
					data: {
                        emoji: record.emoji,
                        name: record.name,
                        dir: parseInt(record.dir)
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
				await prisma.change.create({
					data: {
                        typeId: parseInt(record.typeId, 10),
                        amount: parseFloat(record.amount),
                        from: record.from,
                        to: record.to
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
				await prisma.goal.create({
					data: {
                        //type,value,name,description,changeTypeId
                        type: parseInt(record.type),
                        value: parseFloat(record.value),
                        name: record.name,
                        description: record.description,
                        changeTypeId: parseInt(record.changeTypeId, 10)    
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
