"use client";

import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { deleteHaiku } from "../actions/haikuController";
import { CldImage } from "next-cloudinary";

export default function HaikuCard({ haiku }) {
  if(!haiku.image){
    haiku.image ="fallback"
  }


  return (
    <div className="rounded overflow-hidden relative shadow-lg mx-auto max-w-2xl group my-3">
      {/* <img src="/aspect" alt="" /> */}
      <div
      className="absolute inset-0 bg-gray-200 grid">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>
      <CldImage
        className="absolute inset-0"
        width="672"
        height="300"
        src={haiku?.image}
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
              text: `${haiku.line1}%0A${haiku.line2}%0A${haiku.line3}`,
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
            <CiEdit className="text-2xl text-white" />
          </Link>

          <form action={deleteHaiku}>
            <input
              type="hidden"
              name="id"
              defaultValue={haiku._id.toString()}
            />
            <button>
              <RiDeleteBin6Fill className="text-2xl text-white" />
            </button>
          </form>
        </div>
      
    </div>
  );
}
