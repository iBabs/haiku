"use client";
import { useState } from "react";
import { haikuControler, editHaiku } from "../actions/haikuController";
import { useFormState, useFormStatus } from "react-dom";

export default function HaikuForm(props) {



let mainAction
if(props.action === "edit"){
  mainAction = editHaiku
}
if(props.action === "create"){
  mainAction = haikuControler
}


  const [formState, formAction] = useFormState(mainAction, {});



  // console.log(formState);

  return (
    <div>
      <form action={formAction} className="max-w-xs mx-auto space-y-4 bg-neutral-800 p-5 rounded-lg shadow-md shadow-neutral-900">
        <div>
          <label htmlFor="line1">Line 1:</label>
          <input
            autoComplete="false"
            type="text"
            name="line1"
            id="line1"
            placeholder="line 1"
            className="input input-bordered w-full max-w-xs"
            defaultValue={props.haiku?.line1}
          />
          {formState.errors?.line1 && (
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
              <span>{formState.errors?.line1}!</span>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="line2">Line 2</label>
          <input
            autoComplete="false"
            type="line2"
            name="line2"
            id="line2"
            defaultValue={props.haiku?.line2}
            placeholder="line 2"
            className="input input-bordered w-full max-w-xs"
          />
          {formState.errors?.line2 && (
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
              <span>{formState.errors?.line2}!</span>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="password">Line 3:</label>
          
            <input
              autoComplete="false"
              type="text"
              name="line3"
              id="text"
              defaultValue={props.haiku?.line3}
              placeholder="line 3"
              className=" w-full outline-none input input-bordered "
            />
            
          
          {formState.errors?.line3 && (
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
              <span>{formState.errors?.line3}!</span>
            </div>
          )}
        </div>
        <input type="hidden"
        name="haikuId"
        id="haikuId"
        defaultValue={props.haiku?._id.toString()} />
        <button 
        type="submit"
        className="btn btn-secondary w-full capitalize">{props.action} Haiku</button>
      </form>
    </div>
  );
}
