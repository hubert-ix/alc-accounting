import { json, error } from '@sveltejs/kit';

// retrieve an category
export async function GET({ locals, params }) {
  let { data } = await locals.supabase.from('categories').select().eq('id', params.id);
  let category = data[0];
  return json({ category });
}

// update an category
export async function PATCH({ locals, params, request }) {
  const values = await request.json();
  await locals.supabase.from('categories').update(values).eq('id', params.id);
  return json({});
}

// delete a category
export async function DELETE({ locals, params }) {
  await locals.supabase.from('categories').delete().eq('id', params.id);
  return json({})
}
