import { sql } from '@vercel/postgres';

export const POST = async({ request }) => {
  
  let categories = await sql`SELECT * FROM categories;`;
  return new Response(JSON.stringify({ categories }));
}