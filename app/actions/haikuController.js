"use server"

import { ObjectId } from "mongodb"
import { getUser } from "../lib/getUser"





export const haikuControler = async (previousState, formData) => {

    const user = await getUser()


    let loading = true
    const errors = {}
    const haiku = {
        line1: formData.get("line1"),
        line2: formData.get("line2"),
        line3: formData.get("line3"),
        userId: ObjectId.createFromHexString(user.user._id)
    }
    if (haiku.line1.length < 5)  errors.line1 = "Line 1 must be at least 5 characters long";
    if (haiku.line2.length < 7)  errors.line2 = "Line 2 must be at least 7 characters long";
    if (haiku.line3.length < 5)  errors.line3 = "Line 3 must be at least 5 characters long";

    if (Object.keys(errors).length > 0) {
        loading = false
        return { errors, loading }
    }
  





}