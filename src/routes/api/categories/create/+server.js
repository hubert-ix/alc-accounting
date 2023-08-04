import { sql } from '@vercel/postgres';

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { name } = req;
  // create category
  await sql`INSERT INTO categories (name) VALUES (${name})`;
  return new Response();
}