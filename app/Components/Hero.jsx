import React from "react";
import Link from "next/link";


export const metadata = {
  title: "Haiku",
  description: "Welcome to Haiku",
};

export default function Hero() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md space-y-5">
            <h1 className="text-5xl font-bold text-cyan-500">Welcome to Haiku</h1>
            <p className=" font-atma">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link href="/create-haiku" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>
      </div>
    </>
  );
}
