import { db } from '$lib/db.server'

export const POST = async({ request }) => {
  let categories = await db.Category.findMany();
  return new Response(JSON.stringify({ categories }));
}