import Register from "./Components/Register";
import { getUser } from "./lib/getUser";

export default async function Home() {
  const user = await getUser();
  
  console.log(user, "on page")

  return (
    <>
      {user && (
        <p className="text-center my-10 text-amber-500">
          Welcome, You are logged in as {user.user.email}
        </p>
      )}

      {!user && (
        <>
          {" "}
          <p className="text-center my-10 text-amber-500">
            Don&rsquo;t have an account? <strong>Create one now</strong>
          </p>
          <Register />
        </>
      )}
    </>
  );
}
