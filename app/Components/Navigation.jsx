import React from "react";
import Link from "next/link";
import { getUser } from "../lib/getUser";
import { logout } from "../actions/userControllers";

export default async function Navigation() {
  const user = await getUser();

  return (
    <>
      <div className="flex items-center min-h-16 w-full p-3 bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost sm:text-xl">
            HAIKU<span className="text-pink-400">WEEKEND</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu sm:menu-horizontal px-1">
            {user && (
              <div className={`flex flex-col-reverse md:flex-row gap-2 items-center`}>
                <details className="dropdown">
                  <summary className="btn m-1">Menu</summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box space-y-2 md:space-y-0 z-[1] w-52 p-2 text-center shadow">
                    <li>
                    <Link href="/create-haiku" className="btn btn-primary">
                    CREATE HAIKU
                  </Link>
                    </li>
                    <li>
                      <Link href="/haikus" className="btn btn-accent">
                    HAIKUS
                  </Link>
                    </li>
                  </ul>
                </details>
                <li className="flex gap-1 sm:flex-row  items-center bg-primary-content rounded-lg p-2">
                  <p>{user.user?.email}</p>
                  <button onClick={logout} className="btn btn-neutral">
                    LOG-OUT
                  </button>
                </li>
              </div>
            )}
            {!user && <Link href="/login">LOG IN</Link>}
          </ul>
        </div>
      </div>
    </>
  );
}
