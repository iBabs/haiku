"use client";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { register } from "../actions/userControllers";
import { useFormState, useFormStatus } from "react-dom";



export const metadata = {
  title: "Register",
  description: "Register to Haiku",
};

export default function Register() {
  const [show, setShow] = useState(false);
  const [formState, formAction] = useFormState(register, {});

  // console.log(formState);

  return (
    <div>
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
          <label htmlFor="username">Username:</label>
          <input
            autoComplete="false"
            type="username"
            name="username"
            id="username"
            placeholder="username"
            className="input input-bordered w-full max-w-xs"
          />
          {formState.errors?.username && (
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
              <span>{formState.errors?.username}!</span>
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
        <button className="btn btn-secondary">Create account</button>
      </form>
    </div>
  );
}
