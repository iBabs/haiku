"use server"

import { ObjectId } from "mongodb"
import { getUser } from "../lib/getUser"
import { redirect } from "next/navigation"
import { getCollection } from "../lib/db";
import { v2 as cloudinary } from "cloudinary"



const isAlphanumeric = (str) => {
    return /^[a-zA-Z0-9 ,.]*$/.test(str);
}

const cloudConfig = cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function shareLogic(formData, user) {
    console.log(formData.get("public_id"), formData.get("version"), formData.get("signature"))

    const errors = {}
    const haiku = {
        line1: formData.get("line1"),
        line2: formData.get("line2"),
        line3: formData.get("line3"),
        userId: ObjectId.createFromHexString(user.user._id)
    }


    if (typeof haiku.line1 !== "string") haiku.line1 = ""
    if (typeof haiku.line2 !== "string") haiku.line2 = ""
    if (typeof haiku.line3 !== "string") haiku.line3 = ""

    if (haiku.line1.length === 0) errors.line1 = "Line 1 is required"
    if (haiku.line2.length === 0) errors.line2 = "Line 2 is required"
    if (haiku.line3.length === 0) errors.line3 = "Line 3 is required"

    const expectedSignature = cloudinary.utils.api_sign_request({ public_id:formData.get("public_id"), version: formData.get("version") }, process.env.CLOUDINARY_API_SECRET)

    if(expectedSignature === formData.get("signature")) {
        haiku.image = formData.get("public_id")
    } else {
        errors.image = "Image upload failed"
    }

    console.log(haiku.image)

    haiku.line1 = haiku.line1.replace(/(\r\n|\n|\r)/g, ' ').trim()
    haiku.line2 = haiku.line2.replace(/(\r\n|\n|\r)/g, ' ').trim()
    haiku.line3 = haiku.line3.replace(/(\r\n|\n|\r)/g, ' ').trim()

    haiku.line1 = haiku.line1.trim()
    haiku.line2 = haiku.line2.trim()
    haiku.line3 = haiku.line3.trim()

    if (haiku.line1.length < 5) errors.line1 = "Line 1 must be at least 5 characters long";
    if (haiku.line1.length > 35) errors.line1 = "Line 1 must be less than 35 characters long";

    if (haiku.line2.length < 7) errors.line2 = "Line 2 must be at least 7 characters long";
    if (haiku.line2.length > 50) errors.line2 = "Line 2 must be less than 50 characters long";

    if (haiku.line3.length < 5) errors.line3 = "Line 3 must be at least 5 characters long";
    if (haiku.line3.length > 35) errors.line3 = "Line 3 must be less than 35 characters long";

    if (!isAlphanumeric(haiku.line1)) errors.line1 = "Line 1 must be alphanumeric"
    if (!isAlphanumeric(haiku.line2)) errors.line2 = "Line 2 must be alphanumeric"
    if (!isAlphanumeric(haiku.line3)) errors.line3 = "Line 3 must be alphanumeric"




    return { errors, haiku }

}


//create haiku

export const haikuControler = async (previousState, formData) => {

    const user = await getUser()

    if (!user) {
        return redirect('/')
    }


    const results = await shareLogic(formData, user)

    if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
        return { errors: results.errors }
    }
    const haikusCollection = await getCollection("haikus")

    const newHaiku = await haikusCollection.insertOne(results.haiku)

    return redirect('/haikus')

}

//delete haiku

export const deleteHaiku = async (formData) => {

    const user = await getUser()

    if (!user) {
        return redirect('/')
    }
    const haikusCollection = await getCollection("haikus")
    let id = formData.get("id")

    if (typeof id !== "string") {
        id = ""
    }

    const haikuOwner = await haikusCollection.findOne({ _id: ObjectId.createFromHexString(id) })

    if (haikuOwner.userId.toString() !== user.user._id) {
        return redirect('/haikus')
    }

    const haiku = await haikusCollection.deleteOne({ _id: ObjectId.createFromHexString(formData.get("id")) })

    return redirect('/haikus')

}

export const editHaiku = async (previousState, formData) => {

    const user = await getUser()

    if (!user) {
        return redirect('/')
    }


    const results = await shareLogic(formData, user)

    if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
        return { errors: results.errors }
    }
    const haikusCollection = await getCollection("haikus")

    let id = formData.get("haikuId")

    if (typeof id !== "string") {
        id = ""
    }

    const haikuOwner = await haikusCollection.findOne({ _id: ObjectId.createFromHexString(id) })

    if (haikuOwner.userId.toString() !== user.user._id) {
        return redirect('/haikus')
    }

    // edit the haiku
    const newHaiku = await haikusCollection.updateOne(
        { _id: ObjectId.createFromHexString(formData.get("haikuId")) },
        { $set: results.haiku }
    )

    return redirect('/haikus')

}