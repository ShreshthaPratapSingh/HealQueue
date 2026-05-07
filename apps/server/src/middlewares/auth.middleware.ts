import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token){
            res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        req.user = decoded;

        next();
    }
    catch(err){
        res.status(401).json({ message: "Invalid or expired token" });
    }
}