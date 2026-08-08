import { json, error } from '@sveltejs/kit';

// retrieve an operation
export async function GET({ locals, params }) {
  let { data } = await locals.supabase.from('operations').select().eq('id', params.id);
  let operation = data[0];
  return json({ operation });
}

// update an operation
export async function PATCH({ locals, params, request }) {
  const values = await request.json();
  await locals.supabase.from('operations').update(values).eq('id', params.id);
  return json({});
}

// delete an operation
export async function DELETE({ locals, params }) {
  await locals.supabase.from('operations').delete().eq('id', params.id);
  return json({})
}
