import Hero from "./Components/Hero";
import Register from "./Components/Register";
import { getUser } from "./lib/getUser";



export const metadata = {
  title: "Haiku",
  description: "A simple haiku generator",
};

export default async function Home() {
  const user = await getUser();
  
  // console.log(user, "on page")

  return (
    <>
      {user && (
        <>
        <Hero/>
        </>
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
