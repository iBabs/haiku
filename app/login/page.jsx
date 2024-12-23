"use client";

import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { login} from "../actions/userControllers";
import { useFormState} from "react-dom";
import Link from "next/link";



export const createMataData = async () => {
  return {
    title: "Login",
    description: "Login to your account",
  };
};

export default function Login() {
  const [show, setShow] = useState(false);
  const [formState, formAction] = useFormState(login, {});

  // console.log(formState);


  return (
    <div className="min-h-[550px] flex flex-col justify-center items-center">
        <h2>LOGIN</h2>
      <form action={formAction} className="max-w-xs mx-auto space-y-4">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            autoComplete="false"
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            className="input input-bordered w-full max-w-xs"
          />
          {formState.errors?.email && (
            <div role="alert" className="alert alert-warning mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{formState.errors?.email}!</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <div className="input input-bordered w-full max-w-xs flex items-center">
            <input
              autoComplete="false"
              type={show ? "text" : "password"}
              name="password"
              id="password"
              placeholder={show ? "password" : "********"}
              className=" w-full outline-none bg-transparent"
            />
            <button type="button" onClick={() => setShow(!show)}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formState.errors?.password && (
            <div role="alert" className="alert alert-warning mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{formState.errors?.password}!</span>
            </div>
          )}
        </div>
        <button className="btn btn-secondary">{formState.loading?"Logging in...":"LOG IN"}</button>
      </form>
      <p className="text-center my-10 text-amber-500">
        Don&rsquo;t have an account? <strong><Link href="/">Create one now</Link> </strong>
      </p>
    </div>
  );
}
