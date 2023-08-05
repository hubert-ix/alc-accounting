export async function load({ fetch, parent, params }) {
  let { currentUser } = await parent();
  if (!currentUser) {
    throw redirect(302, "/login");
  }
  // get categories
  let data = {};
  let result = await fetch("/api/categories/list", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
  let response = await result.json();
  let categories = response.categories;
  // get operation
  data = {operationId: params.operationId};
  result = await fetch("/api/operations/retrieve", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
  response = await result.json();
  let operation = response.operation;
  return { categories, operation };
}
