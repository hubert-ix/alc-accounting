import { db } from '$lib/db.server'

export const POST = async({ request }) => {
  let req = await request.json();
  const { name } = req;
  const category = await db.category.create({
    data: {
      name
    },
  })
  return new Response();
}