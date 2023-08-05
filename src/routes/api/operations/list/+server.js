import { db } from '$lib/db.server'

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { year, month, categoryId } = req;
  let where = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (year) {
    let startDate = year + "-01-01T00:00:00.000Z";
    let endDate = parseInt(year + 1) + "-01-01T00:00:00.000Z";
    if (month) {
      let nextMonth = (month < 12)?month + 1:1;
      let year2 = (month < 12)?year:year+1;
      startDate = year + "-" + month.toString().padStart(2, '0') + "-01T00:00:00.000Z";
      endDate = year2 + "-" + nextMonth.toString().padStart(2, '0') + "-01T00:00:00.000Z";
    }
    where.date = {
      gte: startDate,
      lte: endDate
    }
  }
  let operations = await db.operation.findMany({
    where,
    orderBy: {date: 'asc'}
  });
  return new Response(JSON.stringify({ operations }));
}