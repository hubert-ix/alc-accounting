import { db } from '$lib/db.server'

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { year, month, categoryId } = req;
  let where = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }
  let operations = await db.operation.findMany({
    where,
    orderBy: {date: 'asc'}
  });
  return new Response(JSON.stringify({ operations }));
}