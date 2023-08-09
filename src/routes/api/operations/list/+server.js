import { supabase } from '$lib/db.server.js';

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { year, month, category_id } = req;
  // get the data
  let query = supabase.from('operations').select().order('date').limit(100);
  if (category_id) {
    query.eq("category_id", category_id);
  }
  if (year) {
    let startDate = year + "-01-01";
    let endDate = parseInt(year + 1) + "-01-01";
    if (month) {
      let nextMonth = (month < 12)?month + 1:1;
      let year2 = (month < 12)?year:year+1;
      startDate = year + "-" + month.toString().padStart(2, '0') + "-01";
      endDate = year2 + "-" + nextMonth.toString().padStart(2, '0') + "-01";
    }
    query.gte('date', startDate);
    query.lte('date', endDate);
  }
  const { data } = await query;
  // return data
  return new Response(JSON.stringify({ operations: data }));
}