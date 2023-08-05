import * as cookie from "cookie";

export async function load({ cookies }) {
  console.log("Logging out on the server");
  const str =  cookie.serialize("user", "", {
    path:"/",
    expires: new Date(0)
  })
  cookies.set(str);
  return {};
}