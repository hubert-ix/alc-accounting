import * as cookie from "cookie";

export const POST = async({request, locals }) => {
   
  // gather the data
  let req = await request.json();
  let data = {
    email: req.email,
    password: req.password,
  }

  let correctEmail = import.meta.env.VITE_EMAIL;
  let correctPassword = import.meta.env.VITE_PASSWORD;

  if (data.email != correctEmail || data.password != correctPassword) {
    return new Response(JSON.stringify({ error: "Wrong email/password" }));
  }

  let currentUser = {
    id: 1,
    name: "Hubert"
  }
  
  // set a cookie with the user (we use this in hook.js to retrieve the user object when we refresh the browser)
  const headers = {
    "Set-Cookie": cookie.serialize("user", JSON.stringify(currentUser), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    })
  };

  return new Response(JSON.stringify({ currentUser }), { headers });
} 
