import React from "react";
import Link from "next/link";
import { getUser } from "../lib/getUser";
import { logout } from "../actions/userControllers";

export default async function Navigation() {
  const user = await getUser();

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
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li>
                        <Link href="#">Link 1</Link>
                      </li>
                      <li>
                        <Link href="#">Link 2</Link>
                      </li>
                    </ul>
                  </details>
                </li>{" "}
                <li className="flex gap-1 sm:flex-row  items-center bg-primary-content rounded-lg p-2">
                  <p>{user.user.email}</p>
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
