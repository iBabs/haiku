"use server"

import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import { getCollection } from "../lib/db";
import bcrypt from "bcryptjs"
import { redirect } from 'next/navigation';


const isAlphaNumeric = (x) => {
    const regex = /^[a-zA-Z0-9]*$/i;
    return regex.test(x);
}

export const login = async (previousState, formData) => {
    let loading = true
    const errors = {}
    const user = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    if (typeof user.email != "string") user.email = ""
    if (typeof user.password != "string") user.password = ""

    user.email = user.email.toLowerCase().trim()
    user.password = user.password.trim()

    if (!user.email) {
        errors.email = "Email is required"
        loading = false
    }

    if (!user.password) {
        errors.password = "password is required"
        loading = false
    }

    if (errors.email || errors.password) {
        return {
            errors: errors,
            success: false,
            loading: loading
        }
    }

    const usersCollection = await getCollection("users")
    const userExists = await usersCollection.findOne({ email: user.email })
    if (!userExists) {
        errors.email = "Invalid Email or Password"
        return {
            errors: errors,
            success: false,
            loading: loading
        }
    }

    const passwordMatch = await bcrypt.compare(user.password, userExists.password)
    if (!passwordMatch) {
        errors.password = "Password is incorrect"
        return {
            errors: errors,
            success: false,
            loading: loading
        }
    }

    const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    
    const cookiesStore = await cookies()
    cookiesStore.set("haikuweekend",token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        secure: true
    })



    return redirect("/")
}



export const register = async (previousState, formData) => {
    const errors = {}
    const user = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
    }
    if (typeof user.email != "string") user.email = ""
    if (typeof user.username != "string") user.username = ""
    if (typeof user.password != "string") user.password = ""

    user.email = user.email.toLowerCase().trim()
    user.username = user.username.trim()
    user.password = user.password.trim()


    if (!user.email) {
        errors.email = "Email is required"
    }

    const usersCollection = await getCollection("users")
    const emailExists = await usersCollection.findOne({ email: user.email })
    if (emailExists) {
        errors.email = "Email already  in use"
    }

    if (!user.username) {
        errors.username = "Username is required"
    }
    if (user.username == "") errors.username = "username can't be empty"
    if (user.username.length < 3) errors.username = "username can't be less than 3 char"
    if (user.username.length > 30) errors.username = "username can't more than 30 char"
    if (!isAlphaNumeric(user.username)) errors.username = "username can only contain letters and numbers"


    if (!user.password) {
        errors.password = "XXXXXXXX is required"
    }

    if (user.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
    }
    if (errors.email || errors.username || errors.password) {
        return {
            errors: errors,
            success: false
        }
    }
    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    console.log(user)
    // creating new user instances
    const newUser = await usersCollection.insertOne(user)
    const userId = newUser.insertedId

    //creating jwt token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    //storing cookies
    const cookiesStore = await cookies()
    cookiesStore.set("haikuweekend", token,  {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        secure: true
    })


    return {
        success: true,
        error: false

    }

}

export async function logout() {
    console.log("token offed")
    cookies().delete("haikuweekend")
    redirect('/')

}