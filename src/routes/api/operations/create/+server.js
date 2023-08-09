import { supabase } from '$lib/db.server'

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { values } = req;
  // create operation
  let response = await supabase.from('operations').insert(values).select();
  return new Response(JSON.stringify({ operation: response.data[0] }));
}