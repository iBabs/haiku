import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUser = async (req) => {
    const cookieStore = await cookies()
    const cookieToken =  cookieStore.get('haikuweekend')?.value

    
    if (cookieToken) {
        try {
            const decoded =  jwt.verify(cookieToken, process.env.JWT_SECRET);
            return decoded;
        } catch (err) {
            return null
        }
    }
};