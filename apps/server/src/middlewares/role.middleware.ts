import type { Request, Response, NextFunction } from "express";

export const authorize = (...roles: string[]) =>
    (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user || !roles.includes(req.user.role)) {
            console.warn(
                `[AUTHORIZE] 403 Forbidden — expected: [${roles.join(", ")}], got: "${req.user?.role ?? "NO USER"}" (userId: ${req.user?.id ?? "N/A"}, path: ${req.method} ${req.originalUrl})`
            );
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    }