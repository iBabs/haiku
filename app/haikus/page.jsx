import React from "react";
import { getCollection } from "../lib/db";
import { ObjectId } from "mongodb";
import { getUser } from "../lib/getUser";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { deleteHaiku } from "../actions/haikuController";

export const metadata = {
  title: "Haikus",
  description: "A simple haiku generator",
};

async function getHaiku(id) {
  const collection = await getCollection("haikus");

  const result = await collection
    .find({ userId: ObjectId.createFromHexString(id) })
    .sort()
    .toArray();

  return result;
}

export default async function Haiku() {
  const user = await getUser();
  const haiku = await getHaiku(user.user._id);
  // console.log(haiku)

  return (
    <div className="h-dvh overflow-auto space-y-4 px-4">
      <h1 className="text-center text-3xl text-pink-400 font-bold font-atma ">
        Haiku
      </h1>

      <div className="flex flex-col justify-center  space-y-3">
        {haiku.reverse().map((haiku) => (
          <div
            key={haiku._id}
            className="group flex justify-between space-y-3 border-y border-pink-400 p-3"
          >
            <div className="flex flex-col justify-center space-y-3">
              <p className="text-center text-2xl text-pink-400 font-atma">
                {haiku.line1}
              </p>
              <p className=" text-xl text-slate-400 font-atma">{haiku.line2}</p>
              <p className=" text-xl text-slate-400 font-atma">{haiku.line3}</p>
            </div>
            <div 
            
            className="flex flex-col justify-center items-center space-y-3 opacity-100 sm:opacity-0 group-hover:opacity-100">
              <Link href={`/haikus/${haiku._id}`}>
                <CiEdit className="text-2xl text-pink-400" />
              </Link>
              <button
              onClick={deleteHaiku}
              >
                <RiDeleteBin6Fill className="text-2xl text-pink-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
