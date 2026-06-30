import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./type"
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import config from "../../config";
import { jwtToken } from "../../utils/jwtSecret";
import { Role } from "../../../generated/prisma/enums";


const loginUserDB = async (payload: ILoginUser) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })
    const machtPassword = await bcrypt.compare(password, user.password)
    if (!machtPassword) {
        throw new Error("Password wrong!")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtToken.createJwt(jwtPayload, config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions)

    const refreshToken = jwtToken.createJwt(jwtPayload, config.jwt_refresh_secret, {
        expiresIn: config.jwt_refresh_expires_in
    } as SignOptions)
    return { accessToken, refreshToken }
}


const refreshTokenDB = async (refreshToken: string) => {
    const decodeToken = jwtToken.varifyToken(refreshToken, config.jwt_refresh_secret);

    if (!decodeToken) {
        throw new Error(" Error")
    }

    const { id } = decodeToken as JwtPayload;
    const user = await prisma.user.findUniqueOrThrow({
        where: { id }
    })

    if (user.activeStatus === "BLOCKED") {
        throw new Error("User is blocked")
    }

    const jwtPayload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role,
    }

    const accesseToken = jwtToken.createJwt(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    )
    return { accesseToken }
}


export const authService = {
    loginUserDB,
    refreshTokenDB,

}