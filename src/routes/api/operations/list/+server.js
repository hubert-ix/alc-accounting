import { sql } from '@vercel/postgres';

export const POST = async({ request }) => {
  let operations = await sql`SELECT * FROM operations;`;
  return new Response(JSON.stringify({ operations }));
}