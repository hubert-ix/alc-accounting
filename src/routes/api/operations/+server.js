import { json, error } from '@sveltejs/kit';


// list all operations
export async function GET({ locals, url }) {
  let category_id = url.searchParams.get('category_id');
  let year = url.searchParams.get('year');
  let month = url.searchParams.get('month');
  let promise = locals.supabase.from('operations').select().order('date');
  if (category_id != "all") {
    promise.eq('category_id', category_id);
  }
  if (year != "all") {
    let y = parseInt(year);
    let startDate = y + "-01-01";
    let endDate = (y + 1) + "-01-01";
    if (month != "all") {
      let m = parseInt(month);
      let nextMonth = (m < 12) ? m + 1 : 1;
      let year2 = (m < 12) ? y : y + 1;
      startDate = y + "-" + m.toString().padStart(2, '0') + "-01";
      endDate = year2 + "-" + nextMonth.toString().padStart(2, '0') + "-01";
    }
    promise.gte('date', startDate);
    promise.lt('date', endDate);
  }
  let response = await promise;
  return json({ operations: response.data });
}


// create a new operation
export async function POST({ locals, request }) {
  const values = await request.json();
  let response = await locals.supabase.from("operations").insert(values).select();
  return json({ operation: response.data[0]})
}