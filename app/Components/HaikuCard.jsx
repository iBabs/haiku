"use client";

import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { deleteHaiku } from "../actions/haikuController";
import { CldImage } from "next-cloudinary";

export default function HaikuCard({ haiku }) {
 

  return (
    <div className="rounded overflow-hidden relative shadow-lg mx-auto max-w-2xl group my-3">
      <img src="/aspect-ratio.png" alt="" />
      <div
      className="absolute inset-0 bg-gray-200 grid">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>
      <CldImage
        className="absolute inset-0"
        width="650"
        height="300"
        src={haiku?.image || "/istockphoto-610041376-1024x1024_jhzipe.jpg"}
        crop={{ type: "pad", source: "auto" }}
        fillBackground
        sizes="300px"
        alt="Description of my image"
        overlays={[
          {
            position: {
              x: 34,
              y: 154,
              angle: -10,
              gravity: "north_west",
            },
            text: {
              text: encodeURIComponent(`${haiku.line1}\n${haiku.line2}\n${haiku.line3}`),
              fontFamily: "Arial",
              fontSize: 42,
              fontWeight: "bold",
              color: "black",
            },
          },
          {
            position: {
              x: 34,
              y: 154,
              angle: -10,
              gravity: "north_west",
            },
            text: {
              text: `${haiku.line1}%0A${haiku.line2}%0A${haiku.line3}`,
              textShadow: "0.5px 0.5px 0.5px black",
              fontFamily: "Arial",
              fontSize: 40,
              fontWeight: "bold",
              color: "white",
            },
          },
        ]}
      />

      
        <div className="flex justify-center items-center gap-5 opacity-100 absolute right-2 bottom-2 sm:opacity-0 group-hover:opacity-100">
          <Link href={`/haikus/${haiku._id}`}>
            <CiEdit className="text-3xl text-white bg-gray-600/50 rounded p-2 transition hover:text-slate-200" />
          </Link>

          <form action={deleteHaiku} className="flex items-center gap-5">
            <input
              type="hidden"
              name="id"
              defaultValue={haiku._id.toString()}
            />
            <button>
              <RiDeleteBin6Fill className="text-3xl text-white bg-gray-600/50 rounded p-2 transition hover:text-slate-200" />
            </button>
          </form>
        </div>
      
    </div>
  );
}
