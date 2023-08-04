import { sql } from '@vercel/postgres';

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { values } = req;
  // create operation
  let response = await sql`INSERT INTO operations (type, date, company, description, category, amount, hst, tip) VALUES (${values.type}, ${values.date}, ${values.company}, ${values.description}, ${values.category}, ${values.amount}, ${values.hst}, ${values.tip}) RETURNING id`;
  // return data
  return new Response(JSON.stringify({ id: response.rows[0].id }));
}