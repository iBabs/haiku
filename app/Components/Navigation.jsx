import React from "react";
import Link from "next/link";
import { getUser } from "../lib/getUser";
import { logout } from "../actions/userControllers";

export default async function Navigation() {
  const user = await getUser();
  console.log(user)

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost sm:text-xl">
            HAIKU<span className="text-pink-400">WEEKEND</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu sm:menu-horizontal px-1">
            {user && (
              <>
                {" "}
                <li className="flex flex-col sm:flex-row gap-2 ">
                 <Link href="/create-haiku" className="btn btn-primary">CREATE HAIKU</Link>
                 <Link href='/haikus' className="btn btn-accent">HAIKUS</Link>
                </li>{" "}
                <li className="flex gap-1 sm:flex-row  items-center bg-primary-content rounded-lg p-2">
                  <p>{user.user?.email}</p>
                  <button onClick={logout} className="btn btn-neutral">
                    LOG-OUT
                  </button>
                </li>
              </>
            )}
            {!user && <Link href="/login">LOG IN</Link>}
          </ul>
        </div>
      </div>
    </>
  );
}
