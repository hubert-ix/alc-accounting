import { supabase } from '$lib/db.server.js';

export const POST = async({ request }) => {
  const { data } = await supabase.from('categories').select();
  return new Response(JSON.stringify({ categories: data }));
}