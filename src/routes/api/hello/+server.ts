import { json } from '@sveltejs/kit';

export async function GET() {
	return json({ message: 'Hello from the API!' });
}
