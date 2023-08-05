import { db } from '$lib/db.server'

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { operationId } = req;
  // retrieve the operation
  let operation = await db.operation.findUnique({
    where: {id: parseInt(operationId)}
  });
  return new Response(JSON.stringify({ operation }));
}