import { db } from '$lib/db.server'

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { year, month, category } = req;
  let operations = await db.operations.findMany();
  console.log(operations)
  return new Response(JSON.stringify({ operations }));
}