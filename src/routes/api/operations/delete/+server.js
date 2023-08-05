import { sql } from '@vercel/postgres';

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { id } = req;
  // delete operation
  await sql`DELETE FROM operations WHERE id=${id}`;
  // return data
  return new Response();
}