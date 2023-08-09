import { supabase } from '$lib/db.server'

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { values, operation_id } = req;
  // save the operation
  await supabase.from('operations').update(values).eq('id', operation_id);
  // return data
  return new Response();
}