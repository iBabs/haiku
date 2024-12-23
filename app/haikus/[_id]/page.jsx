import HaikuForm from "@/app/Components/HaikuForm";
import { getCollection } from "@/app/lib/db";
import { ObjectId } from "mongodb";

import React from "react";

export const generateMetadata = async ({ params }) => {
    const {_id} = await params;

  return {
    title: `Edit Haiku ${_id}`,
    description: `Edit Haiku ${params?.line1}`,
  };
};

const getDoc = async (_id)=>{
    const collection = await getCollection("haikus")
    const doc = await collection.findOne({_id:ObjectId.createFromHexString(_id)})
    return doc
}
export default async function page({ params }) {
const {_id} = await params
const doc = await getDoc(_id)
console.log(doc)

  return (
    <div>
      <h2 className="text-center text-2xl my-5 font-atma text-pink-400 ">Edit Product {doc?.line1}</h2>
      <HaikuForm haiku={doc} action="edit"/>
    </div>
  );
}
