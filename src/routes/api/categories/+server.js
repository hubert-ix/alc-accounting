import { json, error } from '@sveltejs/kit';

// list all categories
export async function GET({ locals, url }) {
  let response = await locals.supabase.from('categories').select();
  return json({ categories: response.data });
}

// create a new category
export async function POST({ locals, request }) {
  const values = await request.json();
  let response = await locals.supabase.from("categories").insert(values).select();
  let newId = response.data[0].id;
  return json({ new_id: newId})
}