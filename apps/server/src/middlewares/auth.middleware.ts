import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };

        // Fetch latest user from DB to get current role
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = { id: user._id.toString(), role: user.role };

        next();
    }
    catch(err){
        res.status(401).json({ message: "Invalid or expired token" });
    }
}