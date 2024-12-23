"use server"

import { ObjectId } from "mongodb"
import { getUser } from "../lib/getUser"
import { redirect } from "next/navigation"
import { getCollection } from "../lib/db";



const isAlphanumeric = (str) => {
    return /^[a-zA-Z0-9 ,.]*$/.test(str);
}


async function shareLogic(formData, user) {

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

    haiku.line1 = haiku.line1.replace(/(\r\n|\n|\r)/g, ' ').trim()
    haiku.line2 = haiku.line2.replace(/(\r\n|\n|\r)/g, ' ').trim()
    haiku.line3 = haiku.line3.replace(/(\r\n|\n|\r)/g, ' ').trim()

    haiku.line1 = haiku.line1.trim()
    haiku.line2 = haiku.line2.trim()
    haiku.line3 = haiku.line3.trim()

    if (haiku.line1.length < 5) errors.line1 = "Line 1 must be at least 5 characters long";
    if (haiku.line1.length > 25) errors.line1 = "Line 1 must be less than 25 characters long";

    if (haiku.line2.length < 7) errors.line2 = "Line 2 must be at least 7 characters long";
    if (haiku.line2.length > 35) errors.line2 = "Line 2 must be less than 35 characters long";

    if (haiku.line3.length < 5) errors.line3 = "Line 3 must be at least 5 characters long";
    if (haiku.line3.length > 25) errors.line3 = "Line 3 must be less than 25 characters long";

    if (!isAlphanumeric(haiku.line1)) errors.line1 = "Line 1 must be alphanumeric"
    if (!isAlphanumeric(haiku.line2)) errors.line2 = "Line 2 must be alphanumeric"
    if (!isAlphanumeric(haiku.line3)) errors.line3 = "Line 3 must be alphanumeric"




    return { errors, haiku }

}



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

export const deleteHaiku = async (formData) => {

    const user = await getUser()

    if (!user) {
        return redirect('/')
    }
    const sure = window.confirm("Are you sure you want to delete this haiku?")
    if(!sure){
        return redirect('/haikus')
    }
    const haikusCollection = await getCollection("haikus")

    const haikuOwner = await haikusCollection.findOne({ _id: ObjectId.createFromHexString(formData.get("haikuId")) })

    if(haikuOwner.userId.toString() !== user.user._id){
        return redirect('/haikus')
    }

    const haiku = await haikusCollection.deleteOne({ _id: ObjectId.createFromHexString(formData.get("haikuId")) })

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

    const haikuOwner = await haikusCollection.findOne({ _id: ObjectId.createFromHexString(formData.get("haikuId")) })

    if(haikuOwner.userId.toString() !== user.user._id){
        return redirect('/haikus')
    }

    // edit the haiku
    const newHaiku = await haikusCollection.updateOne(
        { _id: ObjectId.createFromHexString(formData.get("haikuId")) },
        { $set: results.haiku }
    )

    return redirect('/haikus')

}