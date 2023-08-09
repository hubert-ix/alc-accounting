import { db } from '$lib/db.server';
import { supabase } from '$lib/db.server'

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { id } = req;
  // delete operation
  /*await db.operation.delete({
    where: {
      id
    }
  })*/
  await supabase.from('operations').delete().eq('id', id);
  // return data
  return new Response();
}


/*
import { sql } from '@vercel/postgres';

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { id } = req;
  // delete operation
  await sql`DELETE FROM Operation WHERE id=${id}`;
  // return data
  return new Response();
}
*/