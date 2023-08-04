import { createPool } from '@vercel/postgres';
import { sql } from "@vercel/postgres";

export async function load() {
	const db = createPool();
  const { rows: categories } = await db.query('SELECT * FROM categories');
  return {
		categories
	};
}
