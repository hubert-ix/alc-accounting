export async function load({ fetch }) {
  let data = {};
  let result = await fetch("/api/categories/list", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
  let response = await result.json();
  let categories = response.categories.rows;
  result = await fetch("/api/operations/list", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
  response = await result.json();
  let operations = response.operations.rows;
  return { categories, operations };
}
