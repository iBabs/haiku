import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUser = async (req) => {
    const cookieStore = await cookies()
    const cookieToken =  cookieStore.get('haikuweekend')?.value

    
    if (cookieToken) {
        try {
            const userToken = JSON.parse(decodeURIComponent(cookieToken)).token
            const decoded =  jwt.verify(userToken, process.env.JWT_SECRET);
            console.log(JSON.parse(decodeURIComponent(cookieToken)).userExists, "this is the user")
            return {decoded, user: JSON.parse(decodeURIComponent(cookieToken)).userExists};
        } catch (err) {
            console.log(err)
            return null
        }
    }
};