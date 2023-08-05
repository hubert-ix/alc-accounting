import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  let currentUser = (cookies.get("user"))?JSON.parse(cookies.get("user")):null; // the user cookie is set when we log in

  return {
    currentUser
  };
}
