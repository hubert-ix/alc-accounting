import dayjs from 'dayjs';

export async function load({ fetch }) {
  // get categories
  let data = {};
  let result = await fetch("/api/categories/list", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
  let response = await result.json();
  let categories = response.categories;
  // get operations
  let currentYear = dayjs().year();
  let currentMonth = dayjs().month();
  data = {year: currentYear, month: currentMonth, category: 0};
  result = await fetch("/api/operations/list", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
  response = await result.json();
  let operations = response.operations;
  return { categories, operations };
}
