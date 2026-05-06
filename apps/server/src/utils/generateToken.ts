import jwt from "jsonwebtoken";

export default function createToken(data: Object, expiry: Object){
    const token = jwt.sign(data, process.env.JWT_SECRET!, expiry)
    return token
}