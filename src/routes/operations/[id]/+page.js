import * as api from '$lib/api';

export async function load({ fetch, params }) {
  let response = await api.get(fetch, "/api/operations/" + params.id)
  let operation = response.operation;
  return { operation };
}
