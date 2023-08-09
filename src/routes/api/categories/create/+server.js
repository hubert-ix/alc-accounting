import { supabase } from '$lib/db.server'

export const POST = async({ request }) => {
  let req = await request.json();
  const { name } = req;
  await supabase.from('categories').insert({ name });
  return new Response();
}