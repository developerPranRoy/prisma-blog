import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { jwtToken } from "../utils/jwtSecret";
import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";


declare global {
    namespace Express {
        interface Request {
            user?: {
                name: string;
                email: string;
                id: string;
                role: string
            }
        }
    }
}


export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        let token = req.cookies?.accessToken;

        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new Error("You are not logged in.");
        }
        const decoded = jwtToken.varifyToken(
            token,
            config.jwt_access_secret
        ) as JwtPayload & {
            id: string;
            name: string;
            email: string;
            role: Role;
        };

        const { id, name, email, role } = decoded;

        if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
            throw new Error("You don't have permission to access this resource.");
        }
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new Error("User not found.");
        }
        if (user.activeStatus === "BLOCKED") {
            throw new Error("Your account has been blocked.");
        }
        req.user = {
            id,
            name,
            email,
            role,
        };

        next();
    });
};