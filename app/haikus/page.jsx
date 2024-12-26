import React from "react";
import { getCollection } from "../lib/db";
import { ObjectId } from "mongodb";
import { getUser } from "../lib/getUser";
import { redirect } from "next/navigation";
import HaikuCard from "../Components/HaikuCard";

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

  return result.map((haiku) => ({
    ...haiku,
    _id: haiku._id.toString(),
    userId: haiku.userId.toString(),
  }));
}

export default async function Haiku() {
  const user = await getUser();

  if (!user) {
    return redirect("/");
  } 
  const haiku = await getHaiku(user.user._id);
  return (
    <div className="h-dvh overflow-auto space-y-4 px-4">
      <h1 className="text-center text-3xl text-pink-400 font-bold font-atma ">
        Haiku
      </h1>

      <div className="flex flex-col justify-center  space-y-3">
        {haiku&&haiku.reverse().map((haiku, index) => (
          <HaikuCard key={index} haiku={haiku} />
        ))}
      </div>
    </div>
  );
}
