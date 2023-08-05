import { db } from '$lib/db.server'

export const POST = async({ request }) => {
  // gather all the parameters
  let req = await request.json();
  const { values, operationId } = req;
  // save the operation
  values.amount = parseFloat(values.amount);
  values.hst = parseFloat(values.hst);
  values.tip = parseFloat(values.tip);
  const operation = await db.operation.update({
    where: {id: operationId},
    data: values
  })
  // return data
  return new Response();
}